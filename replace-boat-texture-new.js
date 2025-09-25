const fs = require('fs');
const path = require('path');

/**
 * Script untuk mengganti texture pada model GLB dengan boat_texture.png
 */

async function replaceBoatTexture() {
    console.log('🚤 Memulai penggantian texture dengan boat_texture.png...');
    
    try {
        // Import dependencies
        const { NodeIO } = await import('@gltf-transform/core');
        const { ALL_EXTENSIONS } = await import('@gltf-transform/extensions');
        
        // Setup paths
        const modelsDir = path.join(__dirname, 'public', 'models');
        const glbPath = path.join(modelsDir, 'svitzer_gelliswick_-_fishing_boat_3d_scan.glb');
        const texturePath = path.join(modelsDir, 'boat_texture.png');
        const outputPath = path.join(modelsDir, 'boat_model_with_new_texture.glb');
        
        // Verify files exist
        if (!fs.existsSync(glbPath)) {
            throw new Error(`❌ File GLB tidak ditemukan: ${glbPath}`);
        }
        if (!fs.existsSync(texturePath)) {
            throw new Error(`❌ File texture tidak ditemukan: ${texturePath}`);
        }
        
        console.log('✅ Verifikasi file berhasil');
        console.log(`📁 GLB Model: ${path.basename(glbPath)}`);
        console.log(`🖼️  New Texture: ${path.basename(texturePath)}`);
        
        // Check file sizes
        const glbSize = (fs.statSync(glbPath).size / 1024 / 1024).toFixed(2);
        const textureSize = (fs.statSync(texturePath).size / 1024).toFixed(1);
        console.log(`📏 GLB Size: ${glbSize} MB`);
        console.log(`📏 Texture Size: ${textureSize} KB`);
        
        // Initialize IO
        const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
        
        // Read GLB file
        console.log('\n📖 Membaca file GLB...');
        const document = await io.read(glbPath);
        
        // Display current model info
        console.log('📋 Informasi Model Saat Ini:');
        console.log(`   Scenes: ${document.getRoot().listScenes().length}`);
        console.log(`   Nodes: ${document.getRoot().listNodes().length}`);
        console.log(`   Meshes: ${document.getRoot().listMeshes().length}`);
        console.log(`   Materials: ${document.getRoot().listMaterials().length}`);
        console.log(`   Textures: ${document.getRoot().listTextures().length}`);
        
        // Read new texture
        console.log('\n🔍 Membaca texture baru...');
        const textureData = fs.readFileSync(texturePath);
        
        // Create new texture
        const newTexture = document.createTexture('boat_texture')
            .setImage(textureData)
            .setMimeType('image/png');
        
        console.log('✅ Texture baru berhasil dibuat');
        
        console.log('\n🎨 Mengupdate materials...');
        
        // Update all materials
        let materialCount = 0;
        let textureUpdateCount = 0;
        
        document.getRoot().listMaterials().forEach((material, index) => {
            const materialName = material.getName() || `Material_${index + 1}`;
            console.log(`\n  📦 Processing: ${materialName}`);
            materialCount++;
            
            // Replace base color texture (most common)
            if (material.getBaseColorTexture()) {
                material.setBaseColorTexture(newTexture);
                console.log('    ✅ Base color texture diganti');
                textureUpdateCount++;
            } else {
                // Set texture even if not present
                material.setBaseColorTexture(newTexture);
                console.log('    ✅ Base color texture ditambahkan');
                textureUpdateCount++;
            }
            
            // Check and update other texture types if they exist
            let otherTexturesUpdated = 0;
            
            if (material.getNormalTexture()) {
                // Keep normal texture as is, or replace if specifically needed
                console.log('    ℹ️  Normal texture tetap dipertahankan');
            }
            
            if (material.getMetallicRoughnessTexture()) {
                console.log('    ℹ️  Metallic roughness texture tetap dipertahankan');
            }
            
            if (material.getOcclusionTexture()) {
                console.log('    ℹ️  Occlusion texture tetap dipertahankan');
            }
            
            if (material.getEmissiveTexture()) {
                console.log('    ℹ️  Emissive texture tetap dipertahankan');
            }
        });
        
        // Save updated GLB
        console.log('\n💾 Menyimpan GLB yang sudah diperbarui...');
        await io.write(outputPath, document);
        
        // Get final file size
        const finalSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
        
        console.log('\n🎉 BERHASIL!');
        console.log(`📊 Total materials: ${materialCount}`);
        console.log(`🔄 Textures updated: ${textureUpdateCount}`);
        console.log(`📏 Ukuran file asli: ${glbSize} MB`);
        console.log(`📏 Ukuran file baru: ${finalSize} MB`);
        console.log(`📁 File output: ${path.basename(outputPath)}`);
        
        // Ask user if they want to replace original file
        console.log('\n🔄 Mengganti file asli dengan versi baru...');
        fs.copyFileSync(outputPath, glbPath);
        fs.unlinkSync(outputPath);
        console.log('✅ File asli berhasil diperbarui!');
        
        // Final verification
        console.log('\n🔍 Verifikasi akhir...');
        const verifyDoc = await io.read(glbPath);
        const textureNames = verifyDoc.getRoot().listTextures().map(t => t.getName() || 'Unnamed');
        console.log(`📋 Textures dalam model: ${textureNames.join(', ')}`);
        
        if (textureNames.includes('boat_texture')) {
            console.log('✅ Texture boat_texture berhasil terintegrasi!');
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ ERROR:', error.message);
        
        if (error.message.includes('Cannot resolve module')) {
            console.log('\n💡 Solusi: Install dependencies yang diperlukan:');
            console.log('npm install @gltf-transform/core @gltf-transform/extensions');
        }
        
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    replaceBoatTexture().then(success => {
        console.log(success ? '\n🎊 Proses selesai dengan sukses!' : '\n💥 Proses gagal!');
        process.exit(success ? 0 : 1);
    });
}

module.exports = { replaceBoatTexture };
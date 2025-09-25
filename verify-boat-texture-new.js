const fs = require('fs');
const path = require('path');

/**
 * Script untuk memverifikasi texture boat_texture.png pada model GLB
 */

async function verifyBoatTexture() {
    console.log('🔍 Memverifikasi texture boat_texture.png...');
    
    try {
        const { NodeIO } = await import('@gltf-transform/core');
        const { ALL_EXTENSIONS } = await import('@gltf-transform/extensions');
        
        const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
        const glbPath = path.join(__dirname, 'public', 'models', 'svitzer_gelliswick_-_fishing_boat_3d_scan.glb');
        
        console.log('📖 Membaca GLB file yang sudah diperbarui...');
        const document = await io.read(glbPath);
        
        console.log('\n📋 Informasi Model:');
        console.log(`   Scenes: ${document.getRoot().listScenes().length}`);
        console.log(`   Nodes: ${document.getRoot().listNodes().length}`);
        console.log(`   Meshes: ${document.getRoot().listMeshes().length}`);
        console.log(`   Materials: ${document.getRoot().listMaterials().length}`);
        console.log(`   Textures: ${document.getRoot().listTextures().length}`);
        
        console.log('\n🎨 Detail Materials:');
        document.getRoot().listMaterials().forEach((material, index) => {
            const name = material.getName() || `Material_${index + 1}`;
            console.log(`\n   📦 Material ${index + 1}: ${name}`);
            
            const baseTexture = material.getBaseColorTexture();
            if (baseTexture) {
                const textureName = baseTexture.getName() || 'Unnamed';
                const mimeType = baseTexture.getMimeType();
                const size = (baseTexture.getImage()?.byteLength / 1024).toFixed(1);
                
                console.log(`   ├─ Base Color Texture: ${textureName}`);
                console.log(`   ├─ MIME Type: ${mimeType}`);
                console.log(`   └─ Size: ${size} KB`);
                
                if (textureName === 'boat_texture') {
                    console.log('   ✅ BOAT_TEXTURE AKTIF!');
                }
            } else {
                console.log('   └─ Tidak ada base texture');
            }
            
            // Check other textures
            if (material.getNormalTexture()) {
                console.log(`   ├─ Normal Texture: ${material.getNormalTexture()?.getName() || 'Unnamed'}`);
            }
            if (material.getMetallicRoughnessTexture()) {
                console.log(`   ├─ Metallic Roughness: ${material.getMetallicRoughnessTexture()?.getName() || 'Unnamed'}`);
            }
            if (material.getOcclusionTexture()) {
                console.log(`   ├─ Occlusion Texture: ${material.getOcclusionTexture()?.getName() || 'Unnamed'}`);
            }
            if (material.getEmissiveTexture()) {
                console.log(`   └─ Emissive Texture: ${material.getEmissiveTexture()?.getName() || 'Unnamed'}`);
            }
        });
        
        console.log('\n🖼️  Semua Textures:');
        let boatTextureFound = false;
        document.getRoot().listTextures().forEach((texture, index) => {
            const name = texture.getName() || `Texture_${index + 1}`;
            const mimeType = texture.getMimeType();
            const size = (texture.getImage()?.byteLength / 1024).toFixed(1);
            
            console.log(`   ${index + 1}. ${name}`);
            console.log(`      ├─ Type: ${mimeType}`);
            console.log(`      └─ Size: ${size} KB`);
            
            if (name === 'boat_texture') {
                console.log('      🎯 TARGET TEXTURE DITEMUKAN!');
                boatTextureFound = true;
            }
            console.log('');
        });
        
        // File size info
        const fileSize = (fs.statSync(glbPath).size / 1024 / 1024).toFixed(2);
        console.log(`📏 Total GLB File Size: ${fileSize} MB`);
        
        // Summary
        console.log('\n📊 SUMMARY:');
        console.log(`   Materials menggunakan boat_texture: ${boatTextureFound ? '✅ YA' : '❌ TIDAK'}`);
        console.log(`   Total textures dalam model: ${document.getRoot().listTextures().length}`);
        console.log(`   Status texture replacement: ${boatTextureFound ? '✅ BERHASIL' : '❌ GAGAL'}`);
        
        if (boatTextureFound) {
            console.log('\n🎉 VERIFIKASI BERHASIL!');
            console.log('Model GLB sekarang menggunakan boat_texture.png sebagai texture utama.');
        } else {
            console.log('\n⚠️  VERIFIKASI GAGAL!');
            console.log('Texture boat_texture.png tidak ditemukan dalam model.');
        }
        
    } catch (error) {
        console.error('❌ Error selama verifikasi:', error.message);
    }
}

if (require.main === module) {
    verifyBoatTexture();
}

module.exports = { verifyBoatTexture };
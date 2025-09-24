const gltfPipeline = require('gltf-pipeline');
const fs = require('fs');

async function compressGLB() {
  try {
    const inputPath = './public/models/swedish_royal_yacht_amadis.glb';
    const outputPath = './public/models/boat_optimized.glb';
    
    console.log('Reading GLB file...');
    const glb = fs.readFileSync(inputPath);
    
    console.log('Original file size:', (glb.length / 1024 / 1024).toFixed(2), 'MB');
    
    const options = {
      dracoOptions: {
        compressionLevel: 8,
        quantizePositionBits: 12,
        quantizeNormalBits: 8,
        quantizeTexcoordBits: 10
      }
    };
    
    console.log('Compressing...');
    const results = await gltfPipeline.processGlb(glb, options);
    
    fs.writeFileSync(outputPath, results.glb);
    
    console.log('Compressed file size:', (results.glb.length / 1024 / 1024).toFixed(2), 'MB');
    console.log('Compression saved:', outputPath);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

compressGLB();

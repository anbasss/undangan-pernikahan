const gltfPipeline = require('gltf-pipeline');
const fs = require('fs');
const path = require('path');

const inputPath = './public/models/swedish_royal_yacht_amadis.glb';
const outputPath = './public/models/swedish_royal_yacht_amadis_compressed.glb';

console.log('Starting GLB compression...');
console.log('Input file size:', fs.statSync(inputPath).size / 1024 / 1024, 'MB');

const glb = fs.readFileSync(inputPath);

const options = {
  dracoOptions: {
    compressionLevel: 7, // 0-10, higher = better compression
    quantizePositionBits: 14,
    quantizeNormalBits: 10,
    quantizeTexcoordBits: 12,
    quantizeColorBits: 8,
    quantizeGenericBits: 12
  },
  // Optimize for size
  optimizeForCesium: false,
  // Remove unused materials, textures, etc
  removeUnusedMaterials: true,
  removeUnusedTextures: true,
  removeUnusedNodes: true,
  // Texture compression
  textureCompressionOptions: {
    format: 'ktx2',
    quality: 85
  }
};

gltfPipeline.processGlb(glb, options)
  .then(function(results) {
    fs.writeFileSync(outputPath, results.glb);
    const compressedSize = fs.statSync(outputPath).size / 1024 / 1024;
    const originalSize = fs.statSync(inputPath).size / 1024 / 1024;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    
    console.log('Compression completed!');
    console.log('Original size:', originalSize.toFixed(2), 'MB');
    console.log('Compressed size:', compressedSize.toFixed(2), 'MB');
    console.log('Compression ratio:', compressionRatio + '%');
    console.log('Output file:', outputPath);
  })
  .catch(function(error) {
    console.error('Compression failed:', error);
  });

const ffmpegStatic = require('ffmpeg-static');
const { execFile } = require('child_process');
const fs = require('fs');

const extractFrames = (inputFile, outputDir, fps = 30, scale = '1920:-2') => {
  return new Promise((resolve, reject) => {
    // Clean old folder so we don't mix up framerates
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    console.log(`Extracting ${inputFile} to ${outputDir} at ${fps}fps with scale ${scale}...`);
    // -q:v 2 is exceptionally high quality JPG. 
    const args = [
      '-i', inputFile,
      '-vf', `fps=${fps},scale=${scale}`,
      '-q:v', '2',
      `${outputDir}/frame-%03d.jpg`
    ];
    
    execFile(ffmpegStatic, args, (error, stdout, stderr) => {
      if (error) {
         console.error("Error formatting:", stderr);
         reject(error);
      } else {
         console.log(`Finished extracting ${inputFile}`);
         resolve();
      }
    });
  });
};

(async () => {
   try {
     console.log('Starting High-Res Frame Extraction Workflow...');
     await extractFrames('./public/video/smooth-video.mp4', './public/frames/desktop', 30, '1920:-2');
     await extractFrames('./public/video/smooth-video-portrait.mp4', './public/frames/mobile', 30, '-2:1920');
     console.log('All extractions complete!');
   } catch (e) {
     console.error(e);
   }
})();

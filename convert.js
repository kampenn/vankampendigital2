import ffmpeg from 'ffmpeg-static';
import { execSync } from 'child_process';

console.log('Using ffmpeg at:', ffmpeg);
try {
  execSync(`"${ffmpeg}" -i "vankampenscrollportrait.mp4" -vf "unsharp=5:5:1.5:5:5:0.0" -c:v libx264 -preset fast -g 1 -crf 10 -pix_fmt yuv420p -y "public/video/smooth-video-portrait.mp4"`, { stdio: 'inherit' });
  console.log('Done!');
} catch (e) {
  console.error(e);
}

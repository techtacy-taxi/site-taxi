const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'acropolis-tour.html',
    'argolis-tour.html',
    'delphi-tour.html',
    'meteora-tour.html',
    'sounio-tour.html'
];

files.forEach(file => {
    const zhPath = path.join(__dirname, 'zh', file);
    if (fs.existsSync(zhPath)) {
        let content = fs.readFileSync(zhPath, 'utf8');
        
        content = content.replace(/openVehicle图库/g, 'openVehicleGallery');
        content = content.replace(/closeVehicle图库/g, 'closeVehicleGallery');
        
        fs.writeFileSync(zhPath, content, 'utf8');
        console.log(`Fixed JS functions in zh/${file}`);
    }
});

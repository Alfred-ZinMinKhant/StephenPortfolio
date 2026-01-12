document.addEventListener('DOMContentLoaded', function(){
  // use local gallery images from assets/images/gallery
  var galleryFiles = [
    'Find yOur calm.jpg',
    'Fruity macha.jpg',
    'Soft opening.jpg',
    'What is Slow Bar.jpg'
  ];

  var images = galleryFiles.map(function(fname, idx){
    return {
      src: encodeURI('assets/images/gallery/' + fname),
      caption: [
        'Starfish — Brand Awareness',
        'Dream Jelly — Festive Engagement',
        'Starfish Academy — Kids Program',
        'Campaign — Visual Highlights'
      ][idx] || '' ,
      description: [
        'Targeted awareness campaign across Facebook focusing on working professionals.',
        'Seasonal posts and a giveaway activation to boost engagement and page growth.',
        'Creative static posts aimed at parents to highlight learning benefits for children.',
        'A curated selection of visual assets showcasing campaign creative direction.'
      ][idx] || ''
    };
  });

  var grid = document.getElementById('imageGrid');
  if(!grid) return;

  images.forEach(function(img){
    var item = document.createElement('div');
    item.className = 'item overlay';

    var image = document.createElement('img');
    image.src = img.src;
    image.alt = 'campaign image';

    var captionEl = document.createElement('span');
    captionEl.className = 'caption';
    captionEl.textContent = img.caption || '';

    var descEl = document.createElement('p');
    descEl.className = 'caption-desc';
    descEl.textContent = img.description || '';

    // create a centered wrapper to avoid overlap and stack texts
    var wrap = document.createElement('div');
    wrap.className = 'caption-wrap';
    wrap.appendChild(captionEl);
    wrap.appendChild(descEl);

    item.appendChild(image);
    item.appendChild(wrap);
    grid.appendChild(item);
  });
});

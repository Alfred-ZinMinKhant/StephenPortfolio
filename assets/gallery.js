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
        'What is the strategy behind this copy?',
        'What is the strategy behind this copy?',
        'What is the strategy behind this copy?',
        'What is the strategy behind this copy?',
      ][idx] || '' ,
      description: [
        'To attract customers who prefer a calm, cozy environment by emphasizing atmosphere, emotional relief, and sensory experience.',
        'To introduce the new menu drink to matcha lovers by highlighting its ingredients and flavour experience, showing how each element contributes to an authentic and satisfying taste.',
        'To attract new customers during the soft opening with a limited-time promotion and a unique slow bar experience, letting guests watch award-winning baristas and enjoy a memorable, immersive coffee visit.',
        'To educate coffee lovers about the Slow Bar concept, highlighting the café’s slow bar immersive experience where guests can watch and learn from professional baristas while engaging and asking questions.'
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

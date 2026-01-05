document.addEventListener('DOMContentLoaded', function(){
  var images = [{
    src: "https://images.unsplash.com/photo-1586785442401-fd910a25d622?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    caption: "Starfish — Brand Awareness",
    description: "Targeted awareness campaign across Facebook focusing on working professionals."
  },{
    src: "https://images.unsplash.com/photo-1497015289639-54688650d173?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    caption: "Dream Jelly — Festive Engagement",
    description: "Seasonal posts and a giveaway activation to boost engagement and page growth."
  },{
    src: "https://images.unsplash.com/photo-1511903979581-3f1d3afb4372?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    caption: "Starfish Academy — Kids Program",
    description: "Creative static posts aimed at parents to highlight learning benefits for children."
  },{
    src: "https://images.unsplash.com/photo-1587761661415-fa4d76e53560?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    caption: "Campaign — Visual Highlights",
    description: "A curated selection of visual assets showcasing campaign creative direction."
  }];

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

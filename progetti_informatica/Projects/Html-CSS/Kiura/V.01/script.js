fetch('https://api.twitch.tv/helix/users?login=kiurae', {
    headers: {
      'Client-ID': 'f0guoskagxptjjfrzjvb8i9fnk2kdw',
      'Authorization': 'Bearer i1j10zmzf1le1v0t9mc6tphm9l0zze'
    }
  })
  .then(res => res.json())
  .then(data => {
    const user = data.data[0];
  
    const avatar = user.profile_image_url;
  
    const offlineBanner = user.offline_image_url;
  
    console.log("Avatar:", avatar);
    console.log("Offline banner:", offlineBanner);
  
    document.getElementById("pfp").src = avatar;
    document.getElementById("mask").style.backgroundImage = "url('"+offlineBanner+"')";
  });
function lancerDes(nbfaces) {
   return Math.floor(Math.random()*(nbfaces-1)) +1;
}

exports.LancerDes = lancerDes;
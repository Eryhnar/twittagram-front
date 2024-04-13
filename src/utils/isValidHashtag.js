const isValidHashtag = (hashtag) => {
    return /^#[a-z0-9][a-z0-9._-]{0,15}[a-z0-9]$/.test(hashtag);; //include - .
    //no consecutive dots, underscores or hyphens
    //no dots, underscores or hyphens at the beginning
    //lowercase only
    //no spaces
  }
  export default isValidHashtag;
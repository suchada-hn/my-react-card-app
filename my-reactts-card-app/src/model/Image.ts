class Image {
    id: any;
    author: string;
    userauthor?: string;
    width?: any;
    height?: any;
    download_url: string;
    url?: string;
    constructor(author: string, download_url: string, id: string) {
     
      this.author = author;
      this.download_url = download_url;
      this.id = id;
    }
  }
  
  export default Image;
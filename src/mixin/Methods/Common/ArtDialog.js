module.exports = {


  artdialog(title, content, width, height, id, isModal=false) {
    const art = dialog({
      content: content,
      title: title,
      // quickClose: true,
      width: width,
      height: height,
      // id: id
    });
    if (isModal) {
    console.log('modal');
      art.showModal();
    } else {
      console.log('nomodal');	
      art.show();
    }
  }

}

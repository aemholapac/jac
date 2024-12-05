export default function decorate(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);
  
    // setup image columns
    [...block.children].forEach((row) => {
      [...row.children].forEach((col) => {
        console.log("col:");
        console.log(col.innerText);
        console.log("len:"+col.innerText.length);
        if(col.innerText.length==0) {
            console.log("text is empty");
            col.classList.add('no-border-top');
        }
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          if (picWrapper && picWrapper.children.length === 1) {
            // picture is only content in column
            picWrapper.classList.add('table-img-col');
          }
        }
      });
    });
  }
  
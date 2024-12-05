import ffetch from "../../scripts/ffetch.js";
import Fuse from '../../scripts/fuse.min.mjs'
// import Fuse from 'https://deno.land/x/fuse@v7.0.0/dist/fuse.min.mjs'

export async function fetchData() {
    const data = await ffetch('/query-index.json').all();
    // const data = await ffetch('/query-index.json')
    // .sheet(type)
    // .all();
    return data;
}

export async function createOverview(block) {
    const data = await fetchData();
    console.log( data )

    const options = {
        includeScore: true,
        keys : ['title','description']
    }

    let searchWord = location.search.substring(1).split("&")[0];//location.hash.substring(1);
    searchWord = searchWord.split("=")[1];
    console.log(searchWord);
    console.log(`search word: ${searchWord}`)
    const fuse = new Fuse(data, options);
    //const result = fuse.search('情報');
    const result = fuse.search(searchWord);
    console.log("RESULT ====");
    console.log(result);


    let jobList = "";
    result.forEach(element => {
        console.log(element.item.title);
        jobList += `<li>${element.item.title}</li>`
    });

    const searchForm = `
   aa <form name="search" id="search" method="get" action="/" accept-charset="UTF-8">
	<input type="text" name="search_key" id="search_keyword" value="">
    <input type="submit" name="search_button" value="検索" />
    </form>bb
    `;
    block.innerHTML = `<hr>${searchForm}<ul>${jobList}</ul>`;

}


export default async function decorate(block) {
    block.innerHTML="hello";
    await createOverview(block);
}
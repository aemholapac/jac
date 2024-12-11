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
        keys : ['path','title','description']
    }

    const searchForm = `
    <input id="search" placeholder="検索語を入力..." />
    <ul id="results"></ul>
    `;
    block.innerHTML = searchForm;
    console.log("block rendered.");

    const fuse1 = new Fuse(data, options);
    console.log("prep fuse");
    const baseurl = 'https://main--jac--aemholapac.aem.live';
    document.getElementById('search').addEventListener('input', (e) => {
      const query = e.target.value;
      console.log(query);
      const results = fuse1.search(query);
    
      const resultsElement = document.getElementById('results');
      resultsElement.innerHTML = ''; // 結果をクリア
    
      results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${baseurl}${result.item.path}"> ${result.item.title}</a><br> (${result.item.description})`;
        resultsElement.appendChild(li);
      });
    });
    

}


export default async function decorate(block) {
    block.innerHTML="hello";
    await createOverview(block);
}
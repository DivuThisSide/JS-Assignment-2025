const api="http://43.205.110.71:8000";
const select_cat = document.querySelector('#category select');
const select_tag = document.querySelector('#tag select');
let cat_list=[];
let item_list=[];

const Item = async function(i){
    const box = document.querySelector(".items");
    box.innerHTML = '';
    i.forEach(i => {
        const item = document.createElement('div');
        item.classList.add('item_des');
        item.innerHTML = `
            <img src="https://picsum.photos/200?random=${i.id}">
            <h3>${i.name}</h3>
            <div>
            ${i.description}
            <br>
            Price: ${i.price}
            <br>
            Tags: ${i.tags}
            <br>
            <a href="www.google.com">KNOW MORE</a>
            </div>
        `;
        box.appendChild(item);
    })
}

const allData = async function(){
    const [cat, it] = await Promise.all([
        fetch(`${api}/categories`),
        fetch(`${api}/items`)
    ]);

    cat_list = await cat.json();
    item_list = await it.json();
    Item(item_list);
}

const filter = async function(){
    const category = document.querySelector("#category select").value;
    const tag = document.querySelector("#tag select").value;
    
    const final = item_list.filter(i=>{
        const tag_list = i.tags.split('|');
        const a = category == 'all' || i.category == category;
        const b = tag == 'all' || tag_list.includes(tag);
        return a && b;
    });
    Item(final);
}

select_cat.addEventListener("change", filter);
select_tag.addEventListener("change", filter);

window.onload=()=>{
    // fetchCatg();
    allData();
    item_list.forEach(i => Item(i));
};
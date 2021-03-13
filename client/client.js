console.log("It's Working!!!!");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const ideasElement = document.querySelector('.idea');

const API_URL = 'http://localhost:5050/ideas';


loadingElement.style.display = '';


listAllIdeas();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    const idea = {
        name,
        content
    }
    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {    
        method: 'POST',
        body: JSON.stringify(idea),
        headers: {
             'content-type': 'application/json'
        }
   }).then(response => response.json()).then(createdIdea => {
        console.log(createdIdea)
        form.reset();
        setTimeout(() => {
            form.style.display = '';
        }, 30000);
        listAllIdeas();
        loadingElement.style.display = 'none';
    });

});


function listAllIdeas() {
    ideasElement.innerHTML = '';
    fetch(API_URL,).then(response => response.json())
    .then(ideas => {
        console.log(ideas);
        ideas.reverse();
        ideas.forEach(idea => {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            header.textContent = idea.name;

            const contents = document.createElement('p')
            contents.textContent = idea.content;

            const date = document.createElement('small')
            date.textContent = new Date(idea.created);

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date)

            ideasElement.appendChild(div);
        });
        loadingElement.style.display = 'none';
    });
}

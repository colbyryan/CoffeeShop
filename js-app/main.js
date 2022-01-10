const url = "https://localhost:5001/api/beanvariety/";
const coffeeUrl = "https://localhost:5001/api/coffee/"

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
            let app = document.querySelector('#app');

            let htmlList = `
            <h3>Coffee Beans</h3>
            <ol>
                ${beanVarieties.map(getAllBeanVarieties => '<li>' + getAllBeanVarieties.name + '</li>').join('')}
            </ol>`
            app.innerHTML = htmlList;
        })
    getAllCoffee()
        .then(coffee => {
            console.log(coffee);
            let coffeeApp = document.querySelector('#coffee');

            let htmlCoffeeList = `
            <h3>Coffee</h3>
        <ol>
            ${coffee.map(getAllCoffee => '<li>' + getAllCoffee.title + '</li>').join('')}
        </ol>`
            coffeeApp.innerHTML = htmlCoffeeList;
        })
});




const formButton = document.querySelector("#form-button");

formButton.addEventListener("click", () => {
    let beanForm = document.querySelector('#beanForm')

    let form = `
    <form action="" id="beanForm">
    <fieldset>
      <section id="mood">
        <label for="beanName">Bean Name</label>
        <input type="text" name="beanName" placeholder="Enter bean name" id="beanName"></input>
        <label for="beanRegion">Bean Region</label>
        <input type="text" name="beanRegion" placeholder="Enter bean region" id="beanTitle"></input>
        <label for="beanNotes">Notes</label>
        <textarea
        name="beanNotes"
        id="beanNotes"
        placeholder="Enter bean notes"
        cols="30"
        rows="2"
      ></textarea>
      </section>
      <button id="save-button">Save Coffee Bean</button>
    </fieldset>
    </form>
    
    `
    beanForm.innerHTML = form;

    const saveButton = document.querySelector('#save-button')
    saveButton.addEventListener("click", event => {
        event.preventDefault();
        console.log('clicked')
        const newBeanAdd = {
            name: document.querySelector("input[name='beanName']").value,
            region: document.querySelector("input[name='beanRegion']").value,
            notes: document.querySelector("textarea[name='beanNotes']").value
        }
        AddBeanVar(newBeanAdd).then(r => {
            console.log("Response", r)
        })
    })
})

const coffeeButton = document.querySelector('#coffee-button')

coffeeButton.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
            let coffeeForm = document.querySelector("#coffeeForm")

            let form = `
    <form action="" id="coffeeForm">
    <fieldset>
      <section id="mood">
        <label for="coffeeTitle">Bean Name</label>
        <input type="text" name="coffeeTitle" placeholder="Enter coffee title" id="coffeeTitle"></input>
        <label for="beanVariety">BeanVariety</label>
        <select for="beanVarietyId" name="beanVariety">
        ${beanVarieties.map(getAllBeanVarieties => '<option value="' + getAllBeanVarieties.id + '">' + getAllBeanVarieties.name + '</option >').join('')}
        </select >
      </section >
                <button id="save-coffee-button">Save Coffee Bean</button>
    </fieldset >
    </form >
`
            coffeeForm.innerHTML = form;

            const saveCoffeeButton = document.querySelector('#save-coffee-button')
            saveCoffeeButton.addEventListener("click", event => {
                event.preventDefault();
                const newCoffeeAdd = {
                    title: document.querySelector("input[name='coffeeTitle']").value,
                    beanVarietyId: document.querySelector("select[name='beanVariety']").value
                }
                AddCoffee(newCoffeeAdd).then(r => {
                    console.log("Response", r)
                })
            })
        })

})

const deleteCoffeeButton = document.querySelector("#delete-coffee-button")
deleteCoffeeButton.addEventListener("click", () => {
    getAllCoffee().then(coffee => {
        console.log(coffee);
        let deleteCoffee = document.querySelector('#delete-coffee');

        let htmlCoffeeList = `
        <h3>Which Coffee would you like to delete?</h3>
    <ol>
        ${coffee.map(getAllCoffee => '<li>' + getAllCoffee.title + '</li>').join('')}
    </ol>
    <p>Which coffee would you like to delete?</p>
    <input type="text" name="coffeeId" placeholder="Enter a number" id="coffeeId"></input>
    <button id="delete-button">Delete Coffee</button>
    `
        deleteCoffee.innerHTML = htmlCoffeeList;

        const deleteButton = document.querySelector('#delete-button')
        deleteButton.addEventListener("click", event => {
            event.preventDefault();
            console.log('DeleteCoffee')
            const removeCoffee = {
                id: document.querySelector("input[name='coffeeId']").value,
            }
            DeleteCoffee(removeCoffee.id - 1).then(r => {
                console.log("Response", r)
            })
        })
    })
})

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}
function getAllCoffee() {
    return fetch(coffeeUrl).then(resp => resp.json());
}
const AddCoffee = addCoffee => {
    return fetch(coffeeUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(addCoffee)
    }).then(resp => resp.json());
}
const DeleteCoffee = deleteCoffee => {
    return fetch(coffeeUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify(deleteCoffee)
    }).then(resp => resp.json());
}
const AddBeanVar = newBeanAdd => {
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(newBeanAdd)
    }).then(resp => resp.json());
}
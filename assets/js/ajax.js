window.onload = () => {
    // initialisation
    let domContext = document.getElementById("idContext");
    let domAltContext = document.getElementById("idAltContext");
    let domMessage = document.getElementById("idMessage");
    let domActiveTodo = document.getElementById("todolist");
    let domArchive = document.getElementById("archive");
    let domBtnAdd = document.getElementById("idBtnAdd");
    let domBtnSave = document.getElementById("btnArchiveIt");
    let tempoArrayContext = [];
    let tempoArrayColor = [];
    let currentColor = "";
    let context = "";


    // dom initialisation
    if (domContext.value !== '0') {
        domAltContext.style.display = "none";
    } else {
        domAltContext.style.display = "inline";
    }
    domContext.addEventListener("click", () => {
        if (domContext.value !== "0") {
            domAltContext.style.display = "none";
            domAltContext.name = "altContext";
        } else {
            domAltContext.style.display = "inline";
            domAltContext.name = "context";
        }
        context = document.getElementsByName("context").value;
    });

    //////////////////////////////////////////////////
    // T H E   F U N C T I O N S                    //
    //////////////////////////////////////////////////

    //---------------------
    //DRAG N DROP
    //----------------------
    function dragNdropListener(elem) {
        elem.addEventListener('dragstart', dragStart, false);
        elem.addEventListener('dragenter', dragEnter, false)
        elem.addEventListener('dragover', dragOver, false);
        elem.addEventListener('dragleave', dragLeave, false);
        elem.addEventListener('drop', Drop, false);
        elem.addEventListener('dragend', dragEnd, false);
    }

    function dragStart(e) {
        // Target (this) element is the source node.
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
        this.classList.add('dragElem');
    }

    function dragEnter() {
        // this / e.target is the current hover target.
    }

    function dragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        this.classList.add('over');
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.        
        return false;
    }

    function dragLeave() {
        this.classList.remove('over'); // this / e.target is previous target element.
    }

    function Drop(e) {
        // this/e.target is current target element.
        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }
        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            this.parentNode.removeChild(dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin', dropHTML);
            var dropElem = this.previousSibling;
            dragNdropListener(dropElem);
            update();
        }
        this.classList.remove('over');
        return false;
    }

    function dragEnd(e) {
        // this/e.target is the source node.
        this.classList.remove('over');

        /*[].forEach.call(cols, function (col) {
          col.classList.remove('over');
        });*/
    }

    //---------------------
    //RANDOM COLOR
    //----------------------
    function randomColor() {
        let newColor = Math.floor(Math.random() * 16777215).toString(16);
        if (newColor) {
            return newColor;
        } else {
            randomColor();
        }
    }
    //---------------------
    //ADD NEW SELECT OPTION
    //----------------------
    function addContext(context = '0') {
        currentColor = randomColor();
        let existContext = tempoArrayContext.indexOf(context);
        if (existContext == -1) {
            tempoArrayContext.push(context);
            tempoArrayColor.push(currentColor);
            // we add the context to the select
            let newOption = document.createElement("OPTION");
            if (context == '0') {
                newOption.innerText = "add new context";
                newOption.value = '0';
            } else {
                newOption.innerText = context;
                newOption.value = context;
            }
            let optiontarget = document.getElementById("idContext");
            optiontarget.appendChild(newOption);
        }
    }
    //---------------------
    //ADD INTO THE TODOLIST
    //----------------------
    function AddTodoList(tododata) {
        console.log(tododata);

        // we creat new LI AND CHECKBOX AND SPAN
        let newLi = document.createElement("LI");
        let newInput = document.createElement("INPUT");
        let newSpan = document.createElement("SPAN");
        newInput.type = "checkbox";
        newInput.addEventListener("change", () => {
            const confirme = confirm("Are your sure this todo is done");
            if (confirme) {
                let archivNode = document.getElementById("archive");
                let nodToMove = newInput.parentElement;
                newInput.disabled = true;
                newLi.setAttribute("arch", "true");
                domArchive.appendChild(nodToMove);
                update();
            } else {
                newInput.checked = false;
            }
        });
        dragNdropListener(newLi);
        newSpan.innerHTML = tododata.message;
        newLi.appendChild(newInput);
        newLi.setAttribute("draggable", "true");
        newLi.appendChild(newSpan);
        newLi.classList.add("todoLi");
        newLi.setAttribute("arch", tododata.archived);
        let colorTodo = tempoArrayContext.indexOf(tododata.context);
        newLi.style.background = `linear-gradient(90deg, #${tempoArrayColor[colorTodo]} 7%, #2b2a2e 7%)`;
        newLi.setAttribute("context", tododata.context);
        if (tododata.archived === "true") {
            newInput.disabled = "true";
            domArchive.appendChild(newLi);
        } else {
            domActiveTodo.appendChild(newLi);
        }
    }

    //////////////////////////////////////////////////
    // Begin of the page we bring todolist if exist //
    //////////////////////////////////////////////////
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            if (this.response !== "") {
                let jsonData = this.response;
                let jsonArrayFromData = JSON.parse(jsonData);
                jsonArrayFromData.forEach(element => {
                    addContext(element.context); // we create the select option
                    AddTodoList(element); /// we push into the element
                });
            } {
                // on ajoute un unique champs dans select pour creer un nouveau context
                addContext();
            }
        }
    };
    xmlhttp.open("GET", "contenu.php?action=getTodo", true);
    xmlhttp.send();

    /////////////////////////////////////////////
    // we add the new context and the new todo //
    ///////////////////////////////////////////// 
    domBtnAdd.addEventListener("click", () => {
        let userContext = "";
        let userMessage = domMessage.value;
        if (domContext.value !== '0') {
            userContext = domContext.value;
        } else {
            userContext = domAltContext.value;
        }
        let newTodoInArray = {};
        newTodoInArray['context'] = userContext;
        newTodoInArray['message'] = `${userContext} / ${userMessage}`;
        let newTodoInJson = JSON.stringify(newTodoInArray);

        // sanitize
        var xmlhttp = new XMLHttpRequest(); // ajax connection
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonData = this.response;
                let jsonArrayFromData = JSON.parse(jsonData);
                jsonArrayFromData.forEach(element => {
                    addContext(element.context); // we create the select option
                    AddTodoList(element); /// we push into the element
                    update();
                });
            }
        };
        xmlhttp.open("GET", `contenu.php?action=addTodo&data=${newTodoInJson}`, true);
        xmlhttp.send();
        /* addContext(userContext);
         let newTodoArr = {};
         newTodoArr.context = userContext;
         newTodoArr.message = `${userContext} / ${userMessage}`;
         newTodoArr.archived = 'false';
         let jsonNewTodo = JSON.stringify(newTodoArr, true);
         AddTodoList(JSON.parse(jsonNewTodo));
         update();*/
    });

    /////////////////////////////////////////////
    // we save the todolist                    //
    ///////////////////////////////////////////// 
    function update() {
        let allTodo = document.querySelectorAll(".todoLi");
        let arrAllTodo = [];
        allTodo.forEach((element, id) => {
            arrAllTodo[id] = {};
            arrAllTodo[id]['context'] = element.getAttribute('context');
            arrAllTodo[id]['message'] = element.innerText;
            arrAllTodo[id]['archived'] = element.getAttribute('arch');
        });
        let jsonTodoListToSave = JSON.stringify(arrAllTodo);
        var xmlhttp = new XMLHttpRequest(); // ajax connection
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.response);
            }
        };
        xmlhttp.open("GET", `contenu.php?action=saveTodo&data=${jsonTodoListToSave}`, true);
        xmlhttp.send();

    }

};
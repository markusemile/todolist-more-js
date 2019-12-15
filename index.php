<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>To-doux-list</title>
</head>

<body class="bg-primary">
    <div class="wrapper d-flex align-content-center">

        <form>
            <!-- logo  -->
            <p>
                <img src="assets/img/clipboard.png" alt="logo" aria-label="logo" width="80px"
                    height="80px" />
            </p>
            <p>
                <select name="context" id="idContext" aria-label="context"
                    aria-labelledby="Choose the context of the to do" required>
                    <!-- we put here the option from php -->

                </select>
            </p>
            <!-- alternative context for new context -->
            <p>
                <input type="text" name="altContext" id="idAltContext" style="display:none"
                    placeholder="Your new context" maxlength="15" aria-label="newContext"
                    aria-labelledby="Enter your new context here" value="" >
            </p>
            <!-- input for the message -->
            <p>
                <input type="text"  name="message" id="idMessage" maxlength="80" aria-label="Message"
                    aria-labelledby="Enter your message here" placeholder="Your message here" required value="">
            </p>
            <p>
                <input type="button" id="idBtnAdd" value="formAdd" aria-label="addTotodolist"
                    aria-labelledby="add the new todo at the list">
            </p>
        </form>
        <div class="sectionViewer">
            <h3 style="text-align:center">To do List</h3>
            <div class="thelist" id="idList">
                <ul id="todolist" aria-label="active-todolist">
                    
                </ul>
            </div>
            <h3 style="text-align:center">Archive</h3>
            <div class="archive" id="idArch">
                    <ul id="archive" aria-label="archived-todolist">
                    
                        </ul>
            </div>
            
        </div>
    </div>
    <!-- scripts -->
    <script src="assets/js/ajax.js"></script>

</body>

</html>
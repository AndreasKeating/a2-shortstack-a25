// FRONT-END (CLIENT) JAVASCRIPT HERE

//------Add & Delete Handlers--------------
(function () {
  const addForm = document.getElementById("add-form");
  if (addForm) {
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(addForm);
      const payload = {
        model: fd.get("model"),
        year: Number(fd.get("year")),
        mpg: Number(fd.get("mpg"))
      };
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      //const j = await res.json();

      await res.json();
      addForm.reset();
    });
  }

  const delForm = document.getElementById("delete-form");
  if (delForm) {
    delForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(delForm);
      const id = Number(fd.get("id"));
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      //const j = await res.json();

      await res.json();
      delForm.reset();
    });
  }
})();

// const submit = async function( event ) {
//   // stop form submission from trying to load
//   // a new .html page for displaying results...
//   // this was the original browser behavior and still
//   // remains to this day
//   event.preventDefault()
  
//   const input = document.querySelector( "#yourname" ),
//         json = { yourname: input.value },
//         body = JSON.stringify( json )

//   const response = await fetch( "/submit", {
//     method:"POST",
//     body 
//   })

//   const text = await response.text()

//   console.log( "text:", text )
// }

// window.onload = function() {
//    const button = document.querySelector("button");
//   button.onclick = submit;
// }
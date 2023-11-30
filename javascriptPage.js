document.addEventListener("DOMContentLoaded", () => {
  //basic declerations
  const transitionSet = {
    maxHeightOn: "100vh",
    maxHeightOff: 0,
    opacityOff: 0,
    opacityOn: 1,
    overFlowOff: "hidden",
    overFlowOn: "initial",
    overFlowScroll: "auto",
    transitionPoint8Sec: "all .8s",
    transition1Sec: "all 1s",
    transition1Point5Sec: "all 1s",
    transitionStyleSet: "linear",
    transitionSetFunction(domObject, maxHeightValue, opacityValue, overFlowValue, transitionValue, transitionStyleValue) {
      domObject.style.maxHeight = maxHeightValue;
      domObject.style.opacity = opacityValue;
      domObject.style.overflow = overFlowValue;
      domObject.style.transition = transitionValue;
      domObject.style.transitionTimingFunction = transitionStyleValue;
    },
    basicDom(domObject, maxHeightValue, opacityValue) {
      domObject.style.maxHeight = maxHeightValue;
      domObject.style.opacity = opacityValue;
    }
  }

  const { maxHeightOn, maxHeightOff, opacityOff, opacityOn, overFlowOff, overFlowOn, overFlowScroll, transitionPoint8Sec, transition1Sec, transition1Point5Sec, transitionStyleSet } = transitionSet;

  //deletion
  let main = document.querySelector("main");
  main.addEventListener("click", event => {
    if (event.target.matches(".bookButton")) {
      transitionSet.transitionSetFunction(event.target.parentElement, maxHeightOff, opacityOff, overFlowOff, transitionPoint8Sec, transitionStyleSet);
      setTimeout(() => {
        event.target.parentElement.parentElement.removeChild(
          event.target.parentElement
        );
      }, 900);
    }
    //setTimeout,I have use setTimeOut because if i don't, it just disapears the element with those over flow and opacity,... stuff,
    //so for removing the element i need to use removechild,but if i use removechild instantly it can't be get the transition,,
    //so we should give removechild a little bit of delay so the transition get applied.,so if dont remove the element what would happen
    //it jus appears in our searchs and it just appears!!! and setTimeOut time should be more than or equall transition time but
    //jus alittle bit.
  });

  //adding book
  let form = document.forms[0];
  let addInput = form.querySelector("input[type=text]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valueInput = form.querySelector("input[type=text]").value;
    let bookDiv = document.createElement("div");
    let bookP = document.createElement("p");
    let bookButton = document.createElement("button");
    transitionSet.basicDom(bookDiv, maxHeightOff, opacityOff)
    bookDiv.appendChild(bookP);
    bookDiv.appendChild(bookButton);
    document.querySelector("main").appendChild(bookDiv).focus();
    bookP.textContent = valueInput;
    bookButton.textContent = "Delete";

    bookDiv.classList.add("book");
    bookP.classList.add("bookText");
    bookButton.classList.add("bookButton", "btn");
    transitionSet.transitionSetFunction(bookDiv, maxHeightOn, opacityOn, overFlowScroll, transition1Point5Sec, transitionStyleSet);
    addInput.value = "";
  });

  //hide section
  let hide = document.querySelector(".hide input[type=checkbox]");
  hide.addEventListener("change", () => {
    if (hide.checked) {
      transitionSet.transitionSetFunction(main, maxHeightOff, opacityOff, overFlowOff, transitionPoint8Sec, transitionStyleSet);
    } else {
      transitionSet.basicDom(main, maxHeightOn, opacityOn)
    }
  });

  //custom search
  let search = document.querySelector(".search");
  search.addEventListener("keyup", (event) => {
    let searchText = event.target.value.toLowerCase();
    let bookSection = document.querySelectorAll(".book");
    bookSection.forEach((val) => {
      if (
        val.firstElementChild.textContent.toLowerCase().indexOf(searchText) !==
        -1
      ) {
        transitionSet.basicDom(val, maxHeightOn, opacityOn)
      } else {
        transitionSet.transitionSetFunction(val, maxHeightOff, opacityOff, overFlowOff, transitionPoint8Sec, transitionStyleSet);
      }
    });
  });

  //info
  let tabbed = document.querySelector(".tabbed");
  let tabbedContent = document.querySelectorAll(".tabbedContent");
  tabbed.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      let target = event.target.dataset.target;
      tabbedContent.forEach((val) => {
        if (val.id === target) {
          transitionSet.basicDom(val, maxHeightOn, opacityOn);
        } else {
          transitionSet.transitionSetFunction(val, maxHeightOff, opacityOff, overFlowOff, transition1Sec, transitionStyleSet);
        }
      });
    }
  });
});
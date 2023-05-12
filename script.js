/*

https://projects.invisionapp.com/share/KH138P887AMX#/screens/473209489

*/

const animationDuration = 1500,
  accordions = document.querySelectorAll(".accordion-content")

const removeClassFromAllOtherElements = (targetElementClass, classToBeRemoved) => {
  const elementList = document.querySelectorAll(targetElementClass);
  elementList.forEach((item) => {
    item.classList.remove(classToBeRemoved);
  })
}

const manageClasses = (triggeredItem) => {
  removeClassFromAllOtherElements(".accordion-content", "is-open")
  triggeredItem.classList.add('is-open')
  triggeredItem.classList.add('is-expanding')

  setTimeout(() => {
    triggeredItem.classList.remove('is-expanding')
    ScrollTrigger.refresh()
  }, animationDuration)
}

const pageScrollToTriggeredItem = (triggeredItem) => {
  var rect = triggeredItem.getBoundingClientRect()
  var topBorder = rect.top + rect.height
  var middlePage = window.innerHeight
  var scrollTop = rect.top + window.pageYOffset

  if (topBorder >= middlePage) {
    window.scrollTo({
      top: scrollTop,
      behavior: "auto"
    })
  }
}

const checkClass = (targetElementClass, classToBeChecked) => {
  const elementList = document.querySelectorAll(targetElementClass);
  let isExpanding = false
  elementList.forEach((item) => {
    if (item.classList.contains(classToBeChecked)) isExpanding = true
  })
  return isExpanding
}

const expandAnimation = (elemName) => {
  const tl = gsap.timeline()
    .to(elemName, {
      scrollTrigger: {
        trigger: elemName.parentNode,
        start: 'top center',
        onEnter: () => {
          if (!checkClass('.accordion-content', 'is-expanding')) {
            manageClasses(elemName)
          }
        },
        markers: true,
      }
    })
}

accordions.forEach((item) => {
  expandAnimation(item)
})

const accordionButtons = document.querySelectorAll(".expand-btn");
accordionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    //se nessuno is-expanding allora fai questo:
    if (!checkClass('.accordion-content', 'is-expanding')) {
      const parentAccordionContent = btn.parentNode.parentNode.children[1]
      const parentAccordionItem = btn.parentNode.parentNode
      manageClasses(parentAccordionContent)
      pageScrollToTriggeredItem(parentAccordionItem)
    }
  })
})
const correctUsername = 'admin'
const correctPassword = 'admin'

// Navigation Menu
const navItems = document.querySelectorAll('.nav-link')

navItems.forEach((item) => {
  if (item.pathname === window.location.pathname) {
    item.classList.add('active')
  }
})

const isLogin = localStorage.getItem('isLogin') === 'true' ? true : false
localStorage.setItem('isLogin', isLogin)

const modal = document.getElementById('modal')
const loginBtn = document.querySelector('.login_btn')
const logoutBtn = document.querySelector('.logout_btn')
const closeBtn = document.querySelector('.modal_close_btn')

let usernameInput = document.querySelector('.username')
let passwordInput = document.querySelector('.password')

loginBtn.addEventListener('click', () => {
  modal.showModal()
})

if (isLogin) {
  loginBtn.classList.add('hidden')
  logoutBtn.classList.remove('hidden')
}

logoutBtn.addEventListener('click', () => {
  localStorage.setItem('isLogin', false)
  loginBtn.classList.remove('hidden')
  logoutBtn.classList.add('hidden')
  window.location.reload()
})

closeBtn.addEventListener('click', () => {
  const login = localStorage.getItem('isLogin')
  if (login === 'false' || login === false) {
    if (
      usernameInput.value === correctUsername &&
      passwordInput.value === correctPassword
    ) {
      localStorage.setItem('isLogin', true)
      usernameInput.value = ''
      passwordInput.value = ''
      modal.close()
      loginBtn.classList.add('hidden')
      logoutBtn.classList.remove('hidden')
      // reload page
      window.location.reload()
    } else {
      alert('Wrong username or password')
    }
  }
})

const cars_section = document.querySelector('.cars_section')

const cars = [
  {
    name: 'car1',
    img: 'public/car1.jpg',
    rent: 'Rent',
    price: 400,
  },
  {
    name: 'car2',
    img: 'public/car2.jpg',
    rent: 'Rent',
    price: 500,
  },
  {
    name: 'car3',
    img: 'public/car3.jpg',
    rent: 'Rent',
    price: 600,
  },
  {
    name: 'car4',
    img: 'public/car4.jpg',
    rent: 'Rent',
    price: 700,
  },
  {
    name: 'car5',
    img: 'public/car5.jpg',
    rent: 'Rent',
    price: 800,
  },
  {
    name: 'car6',
    img: 'public/car6.jpg',
    rent: 'Rent',
    price: 900,
  },
]

if (cars_section) {
  cars_section.innerHTML = `
  ${cars
      .map((car) => {
        return `
        <div class="car_container">
          <div class="car_img_container">
            <img src="${car.img}" alt="${car.name}">
          </div>
          <button class="btn_reserve ${car.name}">Reserve</button>
        </div>
      `
      })
      .join('')}
  `
}

const rentedCars = []

const btn_reserve = document.querySelectorAll('.btn_reserve')

const addRentedCars = (car) => {
  rentedCars.push(car)
}

const rentedCarsReturn = () => {
  return rentedCars
}

const modalRent = document.getElementById('modal_rent')
const closeModalRent = document.querySelector('.modal_close_btn_rent')
const btnRent = document.querySelector('.btn_rent')

let selectedCar

const cardNumberInput = document.getElementById('card_number')
const cardNameInput = document.getElementById('name_on_card')
const cardExpiryInput = document.getElementById('expiry_date')
const cardSecurityInput = document.getElementById('security_code')
const locationSelect = document.getElementById('location')

const checkCardNumber = (cardNumber) => {
  const regex = /^[0-9]{16}$/
  return regex.test(cardNumber)
}

const checkCardName = (cardName) => {
  const regex = /^[a-zA-Z ]{2,30}$/
  return regex.test(cardName)
}

const checkCardExpiry = (cardExpiry) => {
  const regex = /^[0-9]{2}\/[0-9]{2}$/
  return regex.test(cardExpiry)
}

const checkCardSecurity = (cardSecurity) => {
  const regex = /^[0-9]{3}$/
  return regex.test(cardSecurity)
}

const checkPaymentInput = () => {
  if (
    checkCardNumber(cardNumberInput.value) &&
    checkCardName(cardNameInput.value) &&
    checkCardExpiry(cardExpiryInput.value) &&
    checkCardSecurity(cardSecurityInput.value)
  ) {
    return true
  } else {
    return false
  }
}

btn_reserve.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (isLogin) {
      modalRent.showModal()

      const car = cars.find((car) => car.name === btn.classList[1])
      selectedCar = car
    } else {
      alert('Please login first')
    }
  })
})

if (closeModalRent) {
  closeModalRent.addEventListener('click', () => {
    modalRent.close()
  })
}

if (btnRent) {
  btnRent.addEventListener('click', () => {
    // addRentedCars(selectedCar)
    // modalRent.close()
    if (checkPaymentInput()) {
      addRentedCars(selectedCar)
      modalRent.close()
    } else {
      if (!checkCardNumber(cardNumberInput.value)) {
        cardNumberInput.style.border = '1px solid red'
      }
      if (!checkCardName(cardNameInput.value)) {
        cardNameInput.style.border = '1px solid red'
      }
      if (!checkCardExpiry(cardExpiryInput.value)) {
        cardExpiryInput.style.border = '1px solid red'
      }
      if (!checkCardSecurity(cardSecurityInput.value)) {
        cardSecurityInput.style.border = '1px solid red'
      }
    }
  })
}

if (cardNumberInput) {
  cardNumberInput.addEventListener('input', () => {
    if (checkCardNumber(cardNumberInput.value)) {
      cardNumberInput.style.border = '1px solid green'
    } else {
      cardNumberInput.style.border = '1px solid red'
    }
  })
}

if (cardNumberInput) {
  cardNameInput.addEventListener('input', () => {
    if (checkCardName(cardNameInput.value)) {
      cardNameInput.style.border = '1px solid green'
    } else {
      cardNameInput.style.border = '1px solid red'
    }
  })
}

cardExpiryInput.addEventListener('input', () => {
  if (checkCardExpiry(cardExpiryInput.value)) {
    cardExpiryInput.style.border = '1px solid green'
  } else {
    cardExpiryInput.style.border = '1px solid red'
  }
})

cardSecurityInput.addEventListener('input', () => {
  if (checkCardSecurity(cardSecurityInput.value)) {
    cardSecurityInput.style.border = '1px solid green'
  } else {
    cardSecurityInput.style.border = '1px solid red'
  }
})

const returnCars = document.querySelector('.return')

const rentTab = document.querySelector('.btn_rent_tab')
const returnTab = document.querySelector('.btn_return_tab')

if (rentTab) {
  rentTab.addEventListener('click', () => {
    cars_section.style.display = 'grid'
    returnCars.style.display = 'none'
  })
}

let selectedReturnCar

const modalReturn = document.getElementById('modal_return')

const showRentedCars = () => {
  if (rentedCars) {
    const cars = rentedCarsReturn()
    returnCars.innerHTML = `
    ${cars
        .map((car) => {
          return `
          <div class="car_container">
            <div class="car_img_container">
              <img src="${car.img}" alt="car1">
            </div>
            <button class="btn_return ${car.name}">return</button>
          </div>
        `
        })
        .join('')}
    `
  }

  const btn_return = document.querySelectorAll('.btn_return')

  btn_return.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalReturn.showModal()
      const car = rentedCars.find((car) => car.name === btn.classList[1])
      selectedReturnCar = car
    })
  })
}

if (returnTab) {
  returnTab.addEventListener('click', () => {
    showRentedCars()
    cars_section.style.display = 'none'
    returnCars.style.display = 'grid'
  })
}

const modalCloseReturn = document.querySelector('.modal_close_btn_return')

modalCloseReturn.addEventListener('click', () => {
  modalReturn.close()
})

const inspectBtn = document.querySelector('.btn_inspect')
const inspect = document.querySelector('.inspect')
const loading = document.querySelector('.loading')
const check = document.querySelector('.check')
const bill = document.querySelector('.bill')

const payBtn = document.querySelector('.btn_pay')
const payText = document.querySelector('.pay')
const payLoading = document.querySelector('.pay_loading')
const payCheck = document.querySelector('.pay_check')

let inspection = 'fail'
let pay = false

inspectBtn.addEventListener('click', () => {
  inspect.classList.add('hidden')
  loading.classList.remove('hidden')
  setTimeout(() => {
    loading.classList.add('hidden')
    check.classList.remove('hidden')
    inspection = 'pass'
    setTimeout(() => {
      bill.textContent = `Bill: ${selectedReturnCar.price + 100}`
      inspectBtn.classList.add('hidden')
      payBtn.classList.remove('hidden')
      check.classList.add('hidden')
    }, 500)
  }, 2000)
})

payBtn.addEventListener('click', () => {
  payText.classList.add('hidden')
  payLoading.classList.remove('hidden')
  setTimeout(() => {
    payLoading.classList.add('hidden')
    payCheck.classList.remove('hidden')
    bill.textContent = 'Bill: 0'
    pay = true
    setTimeout(() => {
      payBtn.classList.add('hidden')
      payCheck.classList.add('hidden')
    }, 500)
  }, 2000)
})

const returnBtn = document.querySelector('.btn_return_return')

returnBtn.addEventListener('click', () => {
  if (inspection === 'pass' && pay === true) {
    const index = rentedCars.indexOf(selectedReturnCar)
    rentedCars.splice(index, 1)
    modalReturn.close()
    showRentedCars()
    inspect.classList.remove('hidden')
    check.classList.add('hidden')
    loading.classList.add('hidden')
    inspection = 'fail'
  } else if (inspection === 'fail') {
    alert('Please inspect the car first')
  } else if (pay === false) {
    alert('Please pay first')
  }
})

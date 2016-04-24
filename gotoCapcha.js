var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var visaCenterName = 'Харків';
var actionType = 'Подача документів';
var visaType = 'Шенгенська Віза';
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://www.polandvisa-ukraine.com/scheduleappointment_2.html')
	.then(function () {
	    // step into frame
	    driver.switchTo().frame(driver.findElement(By.xpath("//iframe")));
	    // wait for frame content load
	    driver.sleep(500);
	    // Назначить дату link
	    driver.findElement(webdriver.By.id('ctl00_plhMain_lnkSchApp')).click()
	    // Пункт приема DropDown
	    chooseFromDropdown('ctl00_plhMain_cboVAC', visaCenterName);
	    // Цель визита Dropdown
	    chooseFromDropdown('ctl00_plhMain_cboPurpose', actionType);
	    // Подтвердить выбраные поля
	    driver.findElement(By.id('ctl00_plhMain_btnSubmit')).click();
	    // Установить количество заявителей
	    var amountInput = driver.findElement(By.id('ctl00_plhMain_tbxNumOfApplicants'));
	    amountInput.clear();
	    amountInput.sendKeys('2');
	    // Выбрать категорию визы
	    chooseFromDropdown('ctl00_plhMain_cboVisaCategory', visaType);
	    // Нажать на капчу
	    //driver.findElement(By.className('recaptcha-checkbox-checkmark')).click();

	    driver.switchTo().defaultContent();
	});

function chooseFromDropdown(id, optionName) {
    driver.findElement(webdriver.By.id(id))
    .findElements(By.tagName('option')).then(function (options) {
        options.forEach(function (option) {
            option.getText().then(function (text) {
                if (text.indexOf(optionName) > -1) {
                    option.click();
                    return;
                }
            })
        })
    });
}


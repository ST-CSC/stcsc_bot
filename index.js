const puppeteer = require('puppeteer');
const cheerio = require('cheerio')

//var datafile = JSON.parse(fs.readFileSync('data.json'));
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}



var refresh = async () => {
	try{
		const browser = await puppeteer.launch({
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox'],
			//slowMo: 200, // slow down by 250ms
			headless: true, // The browser is visible
			ignoreHTTPSErrors: true,

		});
		const page = await browser.newPage();
		var data = [];


		await page.goto('https://ag1.oc-statistik.de/index.php');
		await sleep(5000);
		await page.evaluate(() => {
			let ele1 = document.querySelector('input[name="LoginUser"]');
			ele1.value = "BP-kb8991"
			let ele2 = document.querySelector('input[name="LoginPwd"]');
			ele2.value  = "Kanu6228"
		});


		await page.click('button[name="DoLogin"]');
		await sleep(5000);
		let content = await page.content();
		
		var $ = cheerio.load(content);
		data.push("offene Nachrichten : BP-kb :");

			

		$(`body > div.container > div > div:nth-child(2) > table > tbody > tr > td`).each((i,e)=>{
			data.push($(e).text());
		});


		await page.goto('https://oc-statistik.de/index.php');
		await sleep(5000);
		await page.evaluate(() => {
			let ele1 = document.querySelector('input[name="LoginUser"]');
			ele1.value = "Z-AM000"
			let ele2 = document.querySelector('input[name="LoginPwd"]');
			ele2.value  = "Z-AM000-gu274"
		});


		await page.click('button[name="DoLogin"]');
		await sleep(5000);
		let content2 = await page.content();
		
		var $ = cheerio.load(content2);
		data.push("offene Nachrichten : Z-AM :");

			

		$(`body > div.container > div > div:nth-child(2) > table > tbody > tr > td`).each((i,e)=>{
			data.push($(e).text());
		});

		await page.goto('https://web.skype.com');

		await sleep(5000);
		await page.evaluate(() => {
			let ele = document.querySelector('input[type="email"]');
			ele.value = "st-csc@outlook.com";
		});

		await page.click('input[type="submit"]');

		await sleep(5000);
		await page.evaluate(() => {
			let ele = document.querySelector('input[type="password"]');
			ele.value = "D4rd4n.!$ufI2";
		});
		await page.click('input[type="submit"]');



		await sleep(20000);
		await page.click('div[role="button"]').catch((err)=>{console.log(err)});
		await page.click('br[data-text="true"]').catch((err)=>{console.log(err)});

		
		await sleep(3000);
		for (let index = 0; index < data.length; index++) {
			const element = data[index];
			//await page.type('body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div', " ").catch((err)=>{console.log(err)});
			
			await page.keyboard.type(element);
			await page.keyboard.down("Shift");
			await page.keyboard.press(String.fromCharCode(13));
			await page.keyboard.up("Shift");
			console.log(index);
			if(index === 10){
				await page.keyboard.down("Shift");
				await page.keyboard.press(String.fromCharCode(13));
				await page.keyboard.press(String.fromCharCode(13));
				await page.keyboard.press(String.fromCharCode(13));
				await page.keyboard.down("Shift");

			}
			
		}

		await page.keyboard.press(String.fromCharCode(13));
		console.log("done")
		await browser.close();	
	}
	catch(e){
		console.log(e)
	}
}
console.log("Hello , This means I'm ok !!!!!")
refresh().catch((e) =>{console.log('error')});
setInterval(function(){refresh(); console.log("updated")}, 1800000);

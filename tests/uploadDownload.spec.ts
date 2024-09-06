import test, { expect } from "@playwright/test"

const ExcelJs = require('exceljs')

async function writeExcel(searchText, replaceText, filePath){
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, searchText)
    //console.log(output.row,output.column)
    const cell = worksheet.getCell(output.row, output.column)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)

}

async function readExcel(worksheet, searchText){
    let output = {row:-1, column:-1}
    worksheet.eachRow((row, rowNumber)=>{
        row.eachCell((cell, columnNumber)=>{
            if(cell.value === searchText){
                output.row = rowNumber;
                output.column = columnNumber
            }
        })
    })
    return output
}


test('Upload download excel validation', async({page})=>{
    const textSearch = 'Apple'
    const replacedText = 'iPhone'
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    const fileName = download.suggestedFilename()
    await download.saveAs('/Users/riyad.rafat/Downloads/' + fileName);

    await writeExcel(textSearch, replacedText, `/Users/riyad.rafat/Downloads/${fileName}`)
    await page.locator('#fileinput').click()
    await page.locator('#fileinput').setInputFiles(`/Users/riyad.rafat/Downloads/${fileName}`)

    const textLocator = page.getByText(replacedText)
    const desiredRow = page.getByRole('row').filter({has: textLocator})
    await expect(desiredRow.locator('#cell-2-undefined')).toContainText(replacedText)
})
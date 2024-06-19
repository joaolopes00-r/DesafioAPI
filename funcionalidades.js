function loadInfo(){
    this.completeAddress()
    this.getPrevisao()
    
}
async function completeAddress (){
    try {
        const cep = document.getElementById('cep').value;
        const response = await fetch (`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        document.getElementById('logradouro').innerHTML = data.logradouro;
        document.getElementById('bairro').innerHTML = data.bairro;
        document.getElementById('uf').innerHTML = data.localidade + "/" + data.uf;

    } catch (error) {
        alert(error.message);

    }

}
async function getPrevisao (){
    try {
        const lat = document.getElementById('latitude').value;
        const lon = document.getElementById('longitude').value;
        const response = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
        const data = await response.json();
        let temperaturaMedia = 0
        const quantidadeTemperatura = data.hourly.temperature_2m.length; 
        for (let index = 0; index < quantidadeTemperatura; index++){
            temperaturaMedia += data.hourly.temperature_2m[index]
        } 
        temperaturaMedia = (parseFloat(temperaturaMedia) / quantidadeTemperatura).toFixed(1)
        document.getElementById('temperatura').innerHTML = `${temperaturaMedia} ºC` 
    } catch (error) {
        alert(error.message);

    }

}


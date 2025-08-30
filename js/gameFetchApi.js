import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hvgjigwtjzkvznmxfrgk.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


async function fetchDataFromTable() {
    const { data, error } = await supabase
        .from('games')
        .select('name');

    if (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }

    return data;
    }

    fetchDataFromTable().then(data => {
    if (data) {
        console.log('Fetched data:', data);
    }
});











function newGame(gameName)
{
    const span = document.createElement('span');
    const gameList = document.getElementsByClassName('gameList')[0];
    const h3 = document.createElement('h3');
    const img = document.createElement('img');

    h3.textContent = gameName

    gameList.appendChild(span);
    span.appendChild(img);
    span.appendChild(h3);
}
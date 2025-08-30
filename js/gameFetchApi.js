import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hvgjigwtjzkvznmxfrgk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2Z2ppZ3d0anprdnpubXhmcmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NzkyNzksImV4cCI6MjA3MjA1NTI3OX0.OeQ_4UPRqTepNp36CG8RwEnb1kgdHNGIzt8NR0gM6fw'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function newGame(name) {
  const gameList = document.getElementsByClassName('gameList')[0]
  const span = document.createElement('span')
  const img = document.createElement('img')
  const h3 = document.createElement('h3')
  img.src = getImageUrl(name);
  img.alt = name
  h3.textContent = name
  span.appendChild(img)
  span.appendChild(h3)

  span.addEventListener('click', () => {
    window.location.href = `game.html?title=${encodeURIComponent(name)}`
  })

  gameList.appendChild(span)
}

function getImageUrl(gameName) {
  const fileName = gameName.toLowerCase().replace(/\s+/g, '') + '.png'
  return `https://hvgjigwtjzkvznmxfrgk.supabase.co/storage/v1/object/public/game-images/${fileName}`
}

async function loadGames() {
  const { data, error } = await supabase.from('games').select('name')
  if (error) {
    console.error('Error fetching data:', error.message)
    return
  }
  data.forEach(row => newGame(row.name))
}

window.addEventListener('DOMContentLoaded', () => {
  loadGames()
})
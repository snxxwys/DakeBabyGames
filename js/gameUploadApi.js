import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hvgjigwtjzkvznmxfrgk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2Z2ppZ3d0anprdnpubXhmcmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NzkyNzksImV4cCI6MjA3MjA1NTI3OX0.OeQ_4UPRqTepNp36CG8RwEnb1kgdHNGIzt8NR0gM6fw'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function uploadGame() {
  const name = document.getElementById('gameName').value.trim()
  const category = document.getElementById('category').value
  const embed = document.getElementById('embed').value.trim()

  if (!name || category === 'Category' || !embed) {
    alert('Please fill out all fields')
    return
  }

  const { data, error } = await supabase
    .from('games')
    .insert([{ name, category, embedCode: embed }])

  if (error) {
    console.error('Error inserting game:', error.message)
    alert('Error adding game')
  } else {
    console.log('Inserted:', data)
    alert('Game added successfully!')
    document.getElementById('gameName').value = ''
    document.getElementById('category').value = 'Category'
    document.getElementById('embed').value = ''
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit').addEventListener('click', uploadGame)
})
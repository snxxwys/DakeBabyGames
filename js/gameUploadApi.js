import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hvgjigwtjzkvznmxfrgk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2Z2ppZ3d0anprdnpubXhmcmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NzkyNzksImV4cCI6MjA3MjA1NTI3OX0.OeQ_4UPRqTepNp36CG8RwEnb1kgdHNGIzt8NR0gM6fw'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function uploadFile(file) {
    if (!file) return { data: null, error: 'No file provided' }

    const safeName = file.name.replace(/\s+/g, '_')
    const filePath = safeName

    const { data, error } = await supabase.storage
        .from('game-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })

    if (error) {
        console.error('Error uploading file:', error)
        return { data: null, error }
    }

    const { data: urlData } = supabase.storage
        .from('game-images')
        .getPublicUrl(filePath)

    return { data, publicUrl: urlData.publicUrl, error: null }
}

async function uploadGame() {
    const name = document.getElementById('gameName').value.trim()
    const category = document.getElementById('category').value
    const embed = document.getElementById('embed').value.trim()
    const fileInput = document.getElementById('uploadedImg')
    const file = fileInput.files[0]

    if (!name || category === 'Category' || !embed || !file) {
        alert('Please fill out all fields and select a file')
        return
    }

    // 1️⃣ Upload the file
    const { data: fileData, error: fileError, publicUrl } = await uploadFile(file)
    if (fileError) {
        alert('Error uploading image')
        return
    }

    console.log('File uploaded. Public URL:', publicUrl)

    // 2️⃣ Insert game without storing image path
    const { data, error } = await supabase
        .from('games')
        .insert([{ name, category, embedCode: embed }])

    if (error) {
        console.error('Error inserting game:', error.message)
        alert('Error adding game')
    } else {
        console.log('Game inserted:', data)
        alert('Game added successfully!')

        // Clear inputs
        document.getElementById('gameName').value = ''
        document.getElementById('category').value = 'Category'
        document.getElementById('embed').value = ''
        fileInput.value = ''
    }

    // You can now use publicUrl to display the image immediately if needed
}




async function uploadFileReview(file) {
    if (!file) return { data: null, error: 'No file provided' }

    const safeName = file.name.replace(/\s+/g, '_')
    const filePath = safeName

    const { data, error } = await supabase.storage
        .from('review-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })

    if (error) {
        console.error('Error uploading file:', error)
        return { data: null, error }
    }

    const { data: urlData } = supabase.storage
        .from('review-images')
        .getPublicUrl(filePath)

    return { data, publicUrl: urlData.publicUrl, error: null }
}

async function uploadReview() {
    const name = document.getElementById('reviewName').value.trim()
    const fileInput = document.getElementById('uploadedImgReview')
    const file = fileInput.files[0]

    if (!name || !file) {
        alert('Please fill out all fields and select a file')
        return
    }

    // 1️⃣ Upload the file
    const { data: fileData, error: fileError, publicUrl } = await uploadFileReview(file)
    if (fileError) {
        alert('Error uploading image')
        return
    }

    console.log('File uploaded. Public URL:', publicUrl)

    // 2️⃣ Insert game without storing image path
    const { data, error } = await supabase
        .from('reviews')
        .insert({title: name})
    if (error) {
        console.error('Error inserting review:', error.message)
        alert('Error adding review')
    } else {
        console.log('Review inserted:', data)
        alert('Review added successfully!')

        // Clear inputs
        document.getElementById('reviewName').value = ''
        fileInput.value = ''
    }

    // You can now use publicUrl to display the image immediately if needed
}


async function checkPassword() {
    const { data, error } = await supabase.from('passwords').select('password')
        if (error) {
            console.error('Error fetching data:', error.message)
        return
    }

    const password = document.getElementById('password')
    if (password.value) {
        if (password.value == data[0].password) {
            document.getElementById('passwordDiv').classList.add('hidden')
            setCookie("password", "true", 365);
        } else {
            alert('Password Incorrect')
        }
    } else {
        alert('Enter Password')
    }
}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let password = getCookie("password");

  if (password === "true") {
    document.getElementById('passwordDiv').classList.add('hidden');
  } else {
    document.getElementById('passwordDiv').classList.remove('hidden');
  }
}



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', uploadGame)
})

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitReview').addEventListener('click', uploadReview)
})

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('passwordSubmit').addEventListener('click', checkPassword);
    checkCookie()
})
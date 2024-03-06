// 1. Opzetten van de webserver

// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal alle squads uit de directus API op
const storyData = await fetchJson('https://fdnd-agency.directus.app/items/tm_story')

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// 2. Routes die HTTP Request and Responses afhandelen

// Maak een GET route voor de index
app.get('/', function(request, response) {
    // Haal alle stories uit de directus API op
    fetchJson('https://fdnd-agency.directus.app/items/tm_story').then((storyData) => {
      // storyData bevat gegevens van alle stories
      // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
  
      // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd stories
      // Geef ook de messages mee als variabele
      response.render('index', {
        stories: storyData.data,
      })
    })
  })


// 3. Start de webserver

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
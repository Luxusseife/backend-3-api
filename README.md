# Moment 3, _NoSQL-databaser_
Den här README-filen har skapats för att förklara momentets syfte, kort redogöra för arbetsprocessen och beskriva installationen och användningen av webbtjänsten.

## Momentets syfte

- Känna till NoSQL-databaser.
- Kunna skapa och administrera MongoDB-databaser.
- Kunna skapa en REST-baserad webbtjänst med NodeJs, Express och MongoDb.

## Arbetsprocess

Utvecklingsmiljön förbereddes med NPM och Express med koden från föregående moment som bas. Koden anpassades utifrån momentets innehåll och krav genom att radera delar som inte var aktuella och skapa nya delar för anslutningen till MongoDB-databasen via Mongoose samt ett schema för att skapa struktur. Samtliga CRUD-metoder justerades på så sätt att SQL-frågan byttes ut mot en try/catch med en ny metod anpassad för MongoDB. I GET hämtas poster med find(), i POST skapas poster med create(), i PUT uppdateras poster med findByIdAndUpdate() och i DELETE raderas poster med findByIdAndDelete(). Anslutningen testades till MongoDB Compass och samtliga metoder testades med ThunderClient vilket resulterade i revidering av datat som kunde ses i Compass. 

I koden implementeras **CRUD**; create (POST), read (GET), update (PUT) och delete (DELETE). 

## Installation och anslutning till databas

Webbtjänsten använder en MongoDB-databas. För att installera projektet, klona ner källkodsfilerna från detta repo och kör kommandot _npm install_ för att installera nödvändiga npm-paket beskrivna som dependencies och devDependencies i package-json-filen.

## Användning av API

Här nedan beskrivs användningen av API:et:

| **Metod** | **Endpoint** | **Beskrivning**                                                                                                                                   |
|:---------:|:------------:|---------------------------------------------------------------------------------------------------------------------------------------------------|
| GET       | /job        | Hämtar alla lagrade jobb.                                                                                                        |
| POST      | /job        | Lagrar ett nytt jobb. Kräver att ett objekt med fem fält; companyname, jobtitle, location, startdate och enddate skickas med. Enddate är inte required.                           |
| PUT       | /job/:id    | Uppdaterar ett existerande jobb med angivet ID. Kräver att ett objekt med fem fält; companyname, jobtitle, location, startdate och enddate skickas med. Enddate är inte required. |
| DELETE    | /job/:id    | Raderar ett jobb med angivet ID.                                                                                                                  |

### Output

Ett jobb-objekt returneras/skickas i JSON-format med följande struktur:
```
{
   _id: ObjectId('555192b51a266cc17d3cf1da'),
   companyname: "ICA Kvantum Kristianstad",
   jobtitle: "Butiksmedarbetare",
   location: "Kristianstad",
   startdate: "2020-01-01",
   enddate: "2020-12-31"
}
```

#### _Skapad av Jenny Lind, jeli2308_.
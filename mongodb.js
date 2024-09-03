// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const objectId = mongodb.objectId

const {MongoClient, ObjectId, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect database')
    }
    const db = client.db(database)

    // db.collection('users').insertOne({
    //     name: 'Riyanka',
    //     age: 21
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // const update = db.collection('users').updateOne({
    //     _id : new ObjectID("5ff48b0d600e38216cbe41de")
    // }, {
    //     $set: {
    //         name: 'Nandani'
    //     }
    // })
  
    // update.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age: 23
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})
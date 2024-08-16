const cloudinary = require('cloudinary')

// config for connect

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.upload = async (req, res) => {
  console.log('Beggin of upload function')
  let result = await cloudinary.uploader.upload(req.body.image, {
    // upload
    public_id: `${Date.now()}`,
    resource_type: 'auto', // jpeg, png,l etc ...  as imgtype auto
  })
  console.log('Resul is : ', result)
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  })
}

exports.remove = (req, res) => {
  let image_id = req.body.public_id

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ succes: false, err })
    res.send('The image was deleted')
  })
}

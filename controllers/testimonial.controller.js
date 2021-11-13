const Testimonial = require('../models/testimonial.model');

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const testimonial = await Testimonial.findOne().skip(rand);
        if(!testimonial) res.status(404).json({ message: 'Not found' });
        else res.json(testimonial);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getTesById = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if(!testimonial) res.status(404).json({ message: 'Not found' });
      else res.json(testimonial);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addTes = async (req, res) => {
    try {
        const { author, text } = req.body;
        if (author && text) {
            const newTestimonial = new Testimonial({ author: author, text: text });
            await newTestimonial.save();
            res.json(await Testimonial.find());
        }
        else {
            res.json({ message: 'Please provide all details..' });
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.editTes = async (req, res) => {
    const { author, text } = req.body;
    try {
        if (author && text) {
            const testimonial = await Testimonial.findById(req.params.id);
            if (testimonial) {
                testimonial.author = author;
                testimonial.text = text;
                await testimonial.save();
                res.json(await Testimonial.find());
            }
            else {
                res.status(404).json({ message: 'Not found...' });
            }
        }
        else {
            res.json({ message: 'Please provide all details..' });
        }
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteTes = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if(testimonial) {
        await testimonial.remove();
        res.json(await Testimonial.find());
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

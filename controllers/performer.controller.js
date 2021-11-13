const Performer = require('../models/performer.model');

exports.getRandom = async (req, res) => {
    try {
        const count = await Performer.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const performer = await Performer.findOne().skip(rand);
        if(!performer) res.status(404).json({ message: 'Not found' });
        else res.json(performer);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getAll = async (req, res) => {
    try {
        res.json(await Performer.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getPerfById = async (req, res) => {
    try {
      const performer = await Performer.findById(req.params.id);
      if(!performer) res.status(404).json({ message: 'Not found' });
      else res.json(performer);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addPerf = async (req, res) => {
    try {
        const { name, genre, image } = req.body;
        if (name && genre && image) {
            const newPerformer = new Performer ({ name: name, genre: genre, image: image });
            await newPerformer.save();
            res.json(await Performer.find());
        }
        else {
            res.json({ message: 'Please provide all details..' });
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.editPerf = async (req, res) => {
    const { name, genre, image } = req.body;
    try {
        if (name && genre && image) {
            const performer = await Performer.findById(req.params.id);
            if (performer) {
                performer.name = name;
                performer.genre = genre;
                performer.image = image;
                await performer.save();
                res.json(await Performer.find());
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

exports.deletePerf = async (req, res) => {
    try {
      const performer = await Performer.findById(req.params.id);
      if(performer) {
        await performer.remove();
        res.json(await Performer.find());
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

const uniqid = require('uniqid');
const typeCheck = require('type-check').typeCheck;

const productsRouter = (app, fs) => {
  const dataPath = './data/products.json';

  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  app.get('/', (req, res) => {
    res.send('<h1>Welcome in the products campaign API</h1>');
  });

  app.get('/products', (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  app.get('/products/:id', (req, res) => {
    readFile((data) => {
      const productId = req.params['id'];
      data = data.find((product) => product.id === productId);
      res.send(data);
    }, true);
  });

  app.post('/products', (req, res) => {
    readFile((data) => {
      const { name, campaign, keywords, bidAmount, campaignFund, status, town, radius } = req.body;
      const isReqDataTypesCorrect = typeCheck(
        '{name: String, campaign: String,keywords: String, bidAmount: Number, campaignFund: Number, status: String, town: String, radius: Number}',
        req.body,
      );

      if (isReqDataTypesCorrect) {
        const newProduct = {
          id: uniqid(),
          name: name,
          campaign: campaign,
          keywords: keywords,
          bidAmount: bidAmount,
          campaignFund: campaignFund,
          status: status,
          town: town,
          radius: radius,
        };
        data.push(newProduct);
        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send('New product added successfully');
        });
      } else {
        res.status(400).send('Data types are not correct, please check it one more time');
      }
    }, true);
  });

  app.patch('/products/:id', (req, res) => {
    readFile((data) => {
      const productId = req.params['id'];
      const { name, campaign, keywords, bidAmount, campaignFund, status, town, radius } = req.body;
      const isReqDataTypesCorrect = typeCheck(
        '{name: String, campaign: String, keywords: String, bidAmount: Number, campaignFund: Number, status: String, town: String, radius: Number}',
        req.body,
      );

      if (isReqDataTypesCorrect) {
        const updatedProduct = {
          id: productId,
          name: name,
          campaign: campaign,
          keywords: keywords,
          bidAmount: bidAmount,
          campaignFund: campaignFund,
          status: status,
          town: town,
          radius: radius,
        };

        const updatedElementIndex = data.findIndex((element) => element.id === productId);
        data[updatedElementIndex] = updatedProduct;

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`Product id:${productId} updated`);
        });
      } else {
        res.status(400).send('Data types are not correct, please check it one more time');
      }
    }, true);
  });

  app.delete('/products/:id', (req, res) => {
    readFile((data) => {
      const productId = req.params['id'];
      data = data.filter((product) => product.id !== productId);
      writeFile(JSON.stringify(data, '', 2), () => {
        res.status(200).send(`Product id:${productId} removed`);
      });
    }, true);
  });
};

module.exports = productsRouter;

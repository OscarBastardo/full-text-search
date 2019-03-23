import * as dotenv from 'dotenv';

import createServer from 'src/server';
import setupStore from 'src/init/setupStore';

dotenv.config();

const store = setupStore();

const PORT = process.env.PORT || 4000;
const server = createServer(store);
server.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`server listening on port ${PORT}`);
});

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import supertest from 'supertest';
import app from '../app';

const api = supertest(app);
describe('Testing Endpoint To Be Ok', () => {
  it('tests resize endpoint', async () => {
    const response = await api.get(
      '/api/image/resize?name=fjord&width=600&height=600'
    );
    expect(response.status).toBe(200);
  });
  it('tests processing function', async () => {
    const file = await sharp(path.resolve(`./original/fjord.jpg`))
      .resize(100, 100)
      .png()
      .toFile(path.resolve(`./resized/fjord-${100}-${100}.png`));
    expect(file).toBeDefined();
  });
});

describe('Testing File Existence', () => {
  it('tests if file exists', async () => {
    const file = await fs.open(path.resolve('./original/fjord.jpg'));
    expect(file).toBeTruthy();
  });
  it('tests that image processed', async () => {
    const file = await fs.open(path.resolve('./resized/fjord-600-600.png'));
    expect(file).toBeTruthy();
  });
});

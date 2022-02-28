import { Movie } from '../movie';

it('implements optimistic concurrency control', async () => {
  // Create an instance of a movie
  const movie = Movie.build({
    title: 'Tony Horton',
    desc: 'workout video',
    imgTitle: 'asdf',
    img: 'asdf',
    thumbnail: 'asdf',
    trailer: 'asdf',
    video: 'asdf',
    year: 'asdf',
    workout: 'asdf',
    userId: '123',
  });

  // Save the movie to the database
  await movie.save();

  // fetch the movie twice
  const firstInstance = await Movie.findById(movie.id);
  const secondInstance = await Movie.findById(movie.id);

  // make two separate changes to the movies we fetched
  firstInstance!.set({ workout: 'workout 1' });
  secondInstance!.set({ workout: 'workout 2' });

  // save the first fetched movie
  await firstInstance!.save();

  // save the second fetched movie and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const movie = Movie.build({
    title: 'Tony Horton',
    desc: 'workout video',
    imgTitle: 'asdf',
    img: 'asdf',
    thumbnail: 'asdf',
    trailer: 'asdf',
    video: 'asdf',
    year: 'asdf',
    workout: 'asdf',
    userId: '123',
  });
  await movie.save()
  expect(movie.version).toEqual(0)
  await movie.save()
  expect(movie.version).toEqual(1)
  await movie.save()
  expect(movie.version).toEqual(2)
})
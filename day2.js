Array.from({length: 100}, function(_, i) {
  const fizz = ++i % 3 + 'Fizz';
  const buzz = i % 5 + 'Buzz';
  return fizz || buzz ? fizz + buzz : i;
})
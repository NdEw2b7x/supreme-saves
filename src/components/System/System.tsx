export default function System() {
  return (
    <main>
      System
      <input
        type='button'
        value='reload'
        style={{ padding: '1rem' }}
        onClick={() => {
          window.location.reload();
        }}
      />
    </main>
  );
}

export default function TextTvPageForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    console.log(formData);

    const res = await fetch("/api/textTvPages", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pageNumber" className="form-label">
        PageNumber
      </label>
      <input name="pageNumber" type="text" className="form-control" />

      <label htmlFor="header" className="form-label">
        header
      </label>
      <input name="header" type="text" className="form-control" />

      <label htmlFor="content" className="form-label">
        content
      </label>
      <textarea name="content" type="text" className="form-control" />

      <button className="btn btn-primary" type="submit">
        Create TextTvPage
      </button>
    </form>
  );
}

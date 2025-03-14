export function Comment({ comments }) {
    // 🔹 Hvis der ikke er nogen kommentarer, vis en besked til brugeren
    if (!comments || comments.length === 0) {
        return <p>Ingen kommentarer fundet</p>;
    }

    return (
        <div>
            {/* 🔹 Mapper gennem kommentarer og viser dem i en liste */}
            {comments.map((comment, index) => (
                <div key={comment.id || index}>
                    <p><strong>{comment.user_id}</strong> - {comment.createdAt}</p>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    );
}

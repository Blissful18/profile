const connection = require("../configs/DBConnection");

let getUserFeed = (userId,offset) => {
	offset = parseInt(offset);
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT u.display_name,q.wish,pp.title,pp.description,pp.image,pp.progress_post_id,q.quest_id,u.user_id,(SELECT COUNT(*) FROM comments WHERE progress_post_id = pp.progress_post_id) as comments_count,date_format(pp.created_at, '%W %l:%i %p') as created_at_readable, DATE_FORMAT(pp.created_at,'%W %m/%d/%Y %l:%i %p') as created_at FROM progress_posts pp INNER JOIN quests q ON pp.quest_id = q.quest_id INNER JOIN users u ON q.user_id = u.user_id INNER JOIN relationships r ON u.user_id = r.user_one_id 
			WHERE r.user_two_id = ? AND ((r.status = ? AND q.visibility = ?) or (r.status = ? AND (q.visibility IN ('Friends','Close Friends')))) 
			UNION SELECT u2.display_name,q2.wish,pp2.title,pp2.description,pp2.image,pp2.progress_post_id,q2.quest_id,u2.user_id,(SELECT COUNT(*) FROM comments WHERE progress_post_id = pp2.progress_post_id) as comments_count,date_format(pp2.created_at, '%W %l:%i %p') as created_at_readable, DATE_FORMAT(pp2.created_at,'%W %m/%d/%Y %l:%i %p') as created_at FROM  users u2 INNER JOIN quests q2 ON u2.user_id = q2.user_id INNER JOIN progress_posts pp2 ON q2.quest_id = pp2.quest_id WHERE q2.user_id = ?
			ORDER BY created_at DESC LIMIT 5 OFFSET ?
			`,
			[userId,'Friends','Friends','Close Friends',userId,offset],
			(err, results) => {
				if (err){
					// console.log(err);
					reject(err);
				}
				else{
					// console.log("HEREEE");
					resolve(results);
				} 
			}
		);
	});
};



module.exports = {
	getUserFeed,
};
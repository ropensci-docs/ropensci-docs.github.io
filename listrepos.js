const octokit = new Octokit();
const pagemax = 100;
const ul = document.createElement('ul');

function getRepos(page) {
	octokit.repos.listForUser({
		username : "ropensci-docs",
		direction : "asc",
		per_page : pagemax,
		page : page,
	}).then(({ data, headers, status }) => {
		data.map(function(repo){
			var name = repo.full_name.split("/")[1];
			if(name === 'ropensci-docs.github.io') return;

			// try to ignore empty repos
			var created_at = Date.parse(repo.created_at);
			var pushed_at = Date.parse(repo.pushed_at);
			if(Math.abs(pushed_at - created_at) <= 1000) {
				console.log("Repository " + name + " looks unpushed to.");
				return;
			}
			var li = document.createElement('li');
			li.innerHTML = '<a href="./' + name + '">' + name + '</a>';
			ul.appendChild(li);
		});
		if(data.length == pagemax){
			getRepos(page + 1);
		} else {
			var n = (page-1) * 100 + data.length;
			var old = document.getElementById("repolist");
			old.parentNode.replaceChild(ul, old);
			ul.id = "repolist"
			console.log("Fetch complete: " + n + " results");
		}
	});
}

// start with first page
getRepos(1);

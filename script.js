const octokit = new Octokit();
const pagemax = 100;

function getRepos(page) {
	octokit.repos.listForOrg({
		org : "ropensci-docs",
		sort : "full_name",
		direction : "asc",
		type : 'public',
		per_page : pagemax,
		page : page,
	}).then(({ data, headers, status }) => {
		var ul = document.getElementById("repolist");
		data.map(function(repo){
			var name = repo.full_name.split("/")[1];
			if(name === 'ropensci-docs.github.io') return;
			var li = document.createElement('li');
			li.innerHTML = '<a href="./' + name + '">' + name + '</a>';
			ul.appendChild(li);
		});
		if(data.length == pagemax){
			getRepos(page + 1);
		} else {
			var n = (page-1) * 100 + data.length;
			console.log("Fetch complete: " + n + " results");
		}
	});
}

// start with first page
getRepos(1);

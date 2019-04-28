const octokit = new Octokit()
octokit.repos.listForOrg({
	org : "ropensci-docs",
	sort : "full_name",
	direction : "asc",
	per_page : 100,
	type: 'public'
}).then(({ data, headers, status }) => {
 	var ul = document.getElementById("repolist");
  	data.map(function(repo){
  		var name = repo.full_name.split("/")[1];
  		if(name === 'ropensci-docs.github.io') return;
  		var li = document.createElement('li');
  		li.innerHTML = '<a href="./' + name + '">' + name + '</a>'
  		ul.appendChild(li);
  	});
});

import Link from 'next/link';
import Image from 'next/image';

const LandingPage = ({ currentUser }) => {
  // const ticketList = tickets.map((ticket) => {
  //   return (
  //     <tr key={ticket.id}>
  //       <td>{ticket.title}</td>
  //       <td>{ticket.price}</td>
  //       <td>
  //         <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
  //           <a>View</a>
  //         </Link>
  //       </td>
  //     </tr>
  //   );
  // });
  //   return (
  //     <div>
  //       <h1>Tickets</h1>
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>Title</th>
  //             <th>Price</th>
  //             <th>Link</th>
  //           </tr>
  //         </thead>
  //         <tbody>{ticketList}</tbody>
  //       </table>
  //     </div>
  //   );
  // };

  return (
    <div style={{ marginTop: '20px' }}>
      <Image src='/insanity.png' alt='image' width='1500' height='900' />
      <div style={{ position: 'relative', left: '280px', bottom: '220px' }}>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '4px',
            borderRadius: '2px',
          }}
        >
          GET IN THE BEST SHAPE OF YOUR LIFE
        </span>
      </div>
      <div style={{ position: 'relative', left: '340px', bottom: '220px' }}>
        <Image src='/logo.png' alt='image' width='300' height='150' />
      </div>
    </div>
  );

  // const display = movies.map((movie) => {
  //   <div class='card-group mt-5 pt-5'>
  //     <div class='card'>
  //       <Image src={movie.img} alt='image' idth='200' height='50' />
  //       <div class='card-body'>
  //         <h5 class='card-title'>{movie.title}</h5>
  //         <p class='card-text'>{movie.desc}</p>
  //         <p class='card-text'>
  //           <small class='text-muted'>Last updated 3 mins ago</small>
  //         </p>
  //       </div>
  //     </div>
  //     <div class='card'>
  //       {/* <img src="..." class="card-img-top" alt="..."> */}
  //       <div class='card-body'>
  //         <h5 class='card-title'>{movie.title}</h5>
  //         <p class='card-text'>
  //           This card has supporting text below as a natural lead-in to
  //           additional content.
  //         </p>
  //         <p class='card-text'>
  //           <small class='text-muted'>Last updated 3 mins ago</small>
  //         </p>
  //       </div>
  //     </div>
  //     <div class='card'>
  //       {/* <img src="..." class="card-img-top" alt="..."> */}
  //       <div class='card-body'>
  //         <h5 class='card-title'>{movie.title}</h5>
  //         <p class='card-text'>
  //           This is a wider card with supporting text below as a natural lead-in
  //           to additional content. This card has even longer content than the
  //           first to show that equal height action.
  //         </p>
  //         <p class='card-text'>
  //           <small class='text-muted'>Last updated 3 mins ago</small>
  //         </p>
  //       </div>
  //     </div>
  //   </div>;
  // });

  // return (
  //   <div class='card-group mt-5 pt-5'>
  //     {movieList}
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>Movies</h1>
  //     <table className='table'>
  //       <thead>
  //         <tr>
  //           <th>Title</th>
  //           <th>Description</th>
  //           <th>Link</th>
  //         </tr>
  //       </thead>
  //       <tbody>{movieList}</tbody>
  //     </table>
  //   </div>
  // );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // const { data } = await client.get('/api/movies');
  // return { movies: data };
  return {};
};

export default LandingPage;

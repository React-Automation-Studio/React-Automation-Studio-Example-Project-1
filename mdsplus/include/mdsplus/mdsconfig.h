/* include/mdsplus/mdsconfig.h.  Generated from mdsconfig.h.in by configure.  */
/* include/mdsplus/mdsconfig.h.in.  Generated from configure.ac by autoheader.  */

#pragma once
#ifdef _MSC_VER
#define __attribute__(...)
#define EXPORT __declspec(dllexport)
#define MDS_ATTR_FALLTHROUGH
#else


/* Define if building universal (internal helper macro) */
/* #undef AC_APPLE_UNIVERSAL_BUILD */

/* "assert line type" */
#define ASSERT_LINE_TYPE unsigned int

/* "event handler thread min stack size [1MB]" */
#define EVENT_THREAD_STACK_SIZE_MIN 1048576

/* "define FILE_PTR_HL" */
/* #undef FILE_PTR_HL */

/* Define to 1 if you have the <alloca.h> header file. */
#define HAVE_ALLOCA_H 1

/* "Define if you have the clock_gettime function." */
#define HAVE_CLOCK_GETTIME /**/

/* Define to 1 if you have the <dlfcn.h> header file. */
#define HAVE_DLFCN_H 1

/* Define to 1 if you have the <dl.h> header file. */
/* #undef HAVE_DL_H */

/* Define to 1 if you have the <drm/drm.h> header file. */
#define HAVE_DRM_DRM_H 1

/* Define to 1 if you have the <fcntl.h> header file. */
#define HAVE_FCNTL_H 1

/* Define to 1 if you have the `fork' function. */
#define HAVE_FORK 1

/* "Define if you have the getaddrinfo routine" */
#define HAVE_GETADDRINFO /**/

/* "Define if you have getgrgid to get group name." */
#define HAVE_GETGRGID /**/

/* Define to 1 if you have the `gethostname' function. */
#define HAVE_GETHOSTNAME 1

/* "Define if you have getpwuid." */
#define HAVE_GETPWUID /**/

/* "Define if you have the getrusage routine" */
#define HAVE_GETRUSAGE /**/

/* Define to 1 if you have the `gettimeofday' function. */
#define HAVE_GETTIMEOFDAY 1

/* Define to 1 if you have the <grp.h> header file. */
#define HAVE_GRP_H 1

/* Define to 1 if you have the <hdf5.h> header file. */
/* #undef HAVE_HDF5_H */

/* Define to 1 if you have the <inttypes.h> header file. */
#define HAVE_INTTYPES_H 1

/* Define to 1 if you have the <libxml/parser.h> header file. */
#define HAVE_LIBXML_PARSER_H 1

/* Define to 1 if you have the <libxml/tree.h> header file. */
#define HAVE_LIBXML_TREE_H 1

/* Define to 1 if you have the <libxml/xpathInternals.h> header file. */
#define HAVE_LIBXML_XPATHINTERNALS_H 1

/* Define to 1 if you have the <libxml/xpath.h> header file. */
#define HAVE_LIBXML_XPATH_H 1

/* Define to 1 if you have the <linux/types.h> header file. */
#define HAVE_LINUX_TYPES_H 1

/* Define to 1 if you have the <lzma.h> header file. */
/* #undef HAVE_LZMA_H */

/* Define to 1 if you have the <malloc.h> header file. */
#define HAVE_MALLOC_H 1

/* Define to 1 if you have the <memory.h> header file. */
#define HAVE_MEMORY_H 1

/* Define to 1 if you have the `mkstemp' function. */
#define HAVE_MKSTEMP 1

/* Define to 1 if you have the <netdb.h> header file. */
#define HAVE_NETDB_H 1

/* Define to 1 if you have the <pthread.h> header file. */
#define HAVE_PTHREAD_H 1

/* Define to 1 if you have the `pthread_lock_global_np' function. */
/* #undef HAVE_PTHREAD_LOCK_GLOBAL_NP */

/* Define to 1 if you have the <pwd.h> header file. */
#define HAVE_PWD_H 1

/* Define to 1 if you have the <readline/history.h> header file. */
#define HAVE_READLINE_HISTORY_H 1

/* Define to 1 if you have the <readline/readline.h> header file. */
#define HAVE_READLINE_READLINE_H 1

/* Define to 1 if you have the <resolv.h> header file. */
#define HAVE_RESOLV_H 1

/* Define to 1 if you have the `rl_set_signals' function. */
/* #undef HAVE_RL_SET_SIGNALS */

/* Define to 1 if you have the <scsi/sg.h> header file. */
#define HAVE_SCSI_SG_H 1

/* Define to 1 if you have the `select' function. */
#define HAVE_SELECT 1

/* Define to 1 if you have the `socket' function. */
#define HAVE_SOCKET 1

/* Define to 1 if you have the <stdarg.h> header file. */
#define HAVE_STDARG_H 1

/* Define to 1 if you have the <stdint.h> header file. */
#define HAVE_STDINT_H 1

/* Define to 1 if you have the <stdlib.h> header file. */
#define HAVE_STDLIB_H 1

/* Define to 1 if you have the <strings.h> header file. */
#define HAVE_STRINGS_H 1

/* Define to 1 if you have the <string.h> header file. */
#define HAVE_STRING_H 1

/* Define to 1 if `it_interval' is a member of `struct itimerspec'. */
#define HAVE_STRUCT_ITIMERSPEC_IT_INTERVAL 1

/* Define to 1 if `it_value' is a member of `struct itimerspec'. */
#define HAVE_STRUCT_ITIMERSPEC_IT_VALUE 1

/* Define to 1 if `tv_nsec' is a member of `struct timespec'. */
#define HAVE_STRUCT_TIMESPEC_TV_NSEC 1

/* Define to 1 if `tv_sec' is a member of `struct timespec'. */
#define HAVE_STRUCT_TIMESPEC_TV_SEC 1

/* "Define if you have the sybase includes (freetds)" */
#define HAVE_SYBASE /**/

/* Define to 1 if you have the <syslog.h> header file. */
#define HAVE_SYSLOG_H 1

/* Define to 1 if you have the <sys/filio.h> header file. */
/* #undef HAVE_SYS_FILIO_H */

/* Define to 1 if you have the <sys/ioctl.h> header file. */
#define HAVE_SYS_IOCTL_H 1

/* Define to 1 if you have the <sys/msg.h> header file. */
#define HAVE_SYS_MSG_H 1

/* Define to 1 if you have the <sys/resource.h> header file. */
#define HAVE_SYS_RESOURCE_H 1

/* Define to 1 if you have the <sys/stat.h> header file. */
#define HAVE_SYS_STAT_H 1

/* Define to 1 if you have the <sys/types.h> header file. */
#define HAVE_SYS_TYPES_H 1

/* Define to 1 if you have the <unistd.h> header file. */
#define HAVE_UNISTD_H 1

/* Define to 1 if you have the <valgrind/valgrind.h> header file. */
/* #undef HAVE_VALGRIND_H */

/* Define to 1 if you have the <valgrind/memcheck.h> header file. */
/* #undef HAVE_VALGRIND_MEMCHECK_H */

/* Define to 1 or 0, depending whether the compiler supports simple visibility
   declarations. */
#define HAVE_VISIBILITY 1

/* Define to 1 if you have the <vxWorks.h> header file. */
/* #undef HAVE_VXWORKS_H */

/* Define if debugging is disabled */
#define NDEBUG /**/

/* "Define NEED_SEMUN" */
#define NEED_SEMUN /**/

/* Name of package */
#define PACKAGE "mdsplus"

/* Define to the address where bug reports for this package should be sent. */
#define PACKAGE_BUGREPORT "mdsplus@lists.psfc.mit.edu"

/* Define to the full name of this package. */
#define PACKAGE_NAME "MDSplus"

/* Define to the full name and version of this package. */
#define PACKAGE_STRING "MDSplus 7a"

/* Define to the one symbol short name of this package. */
#define PACKAGE_TARNAME "mdsplus"

/* Define to the home page for this package. */
#define PACKAGE_URL ""

/* Define to the version of this package. */
#define PACKAGE_VERSION "7a"

/* Define as the return type of signal handlers (`int' or `void'). */
#define RETSIGTYPE void

/* Set SHARELIB_TYPE to ".so",".sl",".a" etc... */
#define SHARELIB_TYPE ".so"

/* The size of `int *', as computed by sizeof. */
#define SIZEOF_INT_P 8

/* The size of `long', as computed by sizeof. */
#define SIZEOF_LONG 8

/* "Define if you are using SRB" */
/* #undef SRB */

/* Define to 1 if you have the ANSI C header files. */
#define STDC_HEADERS 1

/* "Need to define the itimerspec structure" */
/* #undef STRUCT_ITIMERSPEC_DEFINITION_MISSING */

/* "Need to define the timespec structure" */
/* #undef STRUCT_TIMESPEC_DEFINITION_MISSING */

/* Define to 1 if you can safely include both <sys/time.h> and <time.h>. */
#define TIME_WITH_SYS_TIME 1

/* Define to 1 if your <sys/time.h> declares `struct tm'. */
/* #undef TM_IN_SYS_TIME */

/* Define if you want to collect performance statistics -- linux only */
/* #undef USE_PERF */

/* "Define if use piped messaging" */
/* #undef USE_PIPED_MESSAGING */

/* Version number of package */
#define VERSION "7a"

/* Define WORDS_BIGENDIAN to 1 if your processor stores words with the most
   significant byte first (like Motorola and SPARC, unlike Intel). */
#if defined AC_APPLE_UNIVERSAL_BUILD
# if defined __BIG_ENDIAN__
#  define WORDS_BIGENDIAN 1
# endif
#else
# ifndef WORDS_BIGENDIAN
/* #  undef WORDS_BIGENDIAN */
# endif
#endif

/* Define to 1 if the X Window System is missing or not being used. */
/* #undef X_DISPLAY_MISSING */

/* Define to 1 if `lex' declares `yytext' as a `char *' by default, not a
   `char[]'. */
/* #undef YYTEXT_POINTER */

/* Enable large inode numbers on Mac OS X 10.5.  */
#ifndef _DARWIN_USE_64_BIT_INODE
# define _DARWIN_USE_64_BIT_INODE 1
#endif

/* Number of bits in a file offset, on hosts where this is settable. */
/* #undef _FILE_OFFSET_BITS */

/* Define for large files, on AIX-style hosts. */
/* #undef _LARGE_FILES */


#ifdef HAVE_LL_CONSTANTS
#define LONG_LONG_CONSTANT(value) value##ll
#else
#define LONG_LONG_CONSTANT(value) value
#endif



#ifdef _WIN32
#define EXPORT __declspec(dllexport)
#elif HAVE_VISIBILITY
# define EXPORT __attribute__((__visibility__("default")))
#else
#define EXPORT
#endif


/* Define to empty if `const' does not conform to ANSI C. */
/* #undef const */

/* Define to `unsigned int' if <sys/types.h> does not define. */
/* #undef size_t */

#endif // _MSC_VER else

